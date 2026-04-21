from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
import subprocess
import asyncio
import tempfile
import os
import shutil
import re
import uuid
import shlex
import json

app = FastAPI()

class RunRequest(BaseModel):
    files: dict[str, str] = None
    code: str = None  # Backward compatibility

@app.post("/run")
async def run_code(request: RunRequest):
    # Support both single code field and project files
    files = request.files if request.files else {"main.zc": request.code}
    if "main.zc" not in files and request.code:
        files["main.zc"] = request.code

    if "main.zc" not in files:
        return {"output": "Error: Missing main.zc entry point.", "error": "missing_entry"}

    # Create a temporary directory for the execution
    with tempfile.TemporaryDirectory() as tmp_dir:
        # Write all files to the temporary directory
        for filename, content in files.items():
            # Basic path sanitization to prevent directory traversal
            clean_name = filename.replace('..', '')
            file_path = os.path.join(tmp_dir, clean_name)
            
            # Ensure subdirectories exist
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            
            with open(file_path, "w") as f:
                f.write(content)

        # Ensure Docker can read the temporary directory and files
        os.chmod(tmp_dir, 0o755)
        for root, dirs, dir_files in os.walk(tmp_dir):
            for d in dirs:
                os.chmod(os.path.join(root, d), 0o755)
            for f in dir_files:
                os.chmod(os.path.join(root, f), 0o644)

        container_name = f"zenc-exec-{uuid.uuid4().hex[:8]}"
        
        # Build the compilation and execution command
        # 1. Compile all plugins first
        plugin_builds = []
        for filename in files:
            if filename.startswith("plugins/") and filename.endswith(".zc"):
                dest_so = filename.replace(".zc", ".so")
                # Compile plugin to shared library
                plugin_builds.append(f"zc {filename} -shared -o {dest_so}")
        
        build_chain = " && ".join(plugin_builds)
        if build_chain:
            build_chain += " && "
            
        main_cmd = "zc main.zc -o main && ./main"
        full_command = f"cd /tmp && {build_chain}{main_cmd}"

        docker_cmd = [
            "docker", "run", "--rm", "-t",
            "--name", container_name,
            "--network", "none",
            "--cpus", "0.5",
            "-m", "128m",
            "--pids-limit", "64",
            "--read-only",
            "--tmpfs", "/tmp:rw,nosuid,exec,size=128m",
            "--cap-drop", "ALL",
            "--security-opt", "no-new-privileges=true",
            "-v", f"{tmp_dir}:/src:ro",
            "zenc_sandbox",
            "sh", "-c", f"cp -r /src/* /tmp/ && cd /tmp && timeout -s 9 15 sh -c {shlex.quote(build_chain + main_cmd)}"
        ]

        try:
            try:
                result = subprocess.run(
                    docker_cmd,
                    capture_output=True,
                    text=True,
                    stdin=subprocess.DEVNULL,
                    timeout=20 
                )
            except subprocess.TimeoutExpired:
                return {"output": "Execution reached the hard 20s time limit.", "error": "timeout"}

            output = (result.stdout + result.stderr).replace('/tmp/', '').replace('\r\n', '\n')
            # Return raw output for Xterm.js to handle ANSI colors
            return {"output": output, "error": "" if result.returncode == 0 else "Execution failed"}

        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
        finally:
            subprocess.run(["docker", "kill", container_name], capture_output=True, check=False)
            subprocess.run(["docker", "rm", "-f", container_name], capture_output=True, check=False)

@app.websocket("/lsp")
async def lsp_proxy(websocket: WebSocket):
    await websocket.accept()
    print(f"LSP: New WebSocket connection accepted")
    
    container_name = f"zenc-lsp-{uuid.uuid4().hex[:8]}"
    
    docker_cmd = [
        "docker", "run", "--rm", "-i",
        "--name", container_name,
        "--network", "none",
        "--cpus", "0.5",
        "-m", "256m",
        "--pids-limit", "64",
        "zenc_sandbox",
        "zc", "lsp"
    ]
    
    try:
        process = await asyncio.create_subprocess_exec(
            *docker_cmd,
            stdin=asyncio.subprocess.PIPE,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        print(f"LSP: Started container {container_name}")
    except Exception as e:
        print(f"LSP: Failed to start container: {e}")
        await websocket.close()
        return

    async def forward_to_lsp():
        try:
            while True:
                data = await websocket.receive_text()
                content = data.encode('utf-8')
                header = f"Content-Length: {len(content)}\r\n\r\n"
                process.stdin.write(header.encode('utf-8') + content)
                await process.stdin.drain()
        except Exception as e:
            print(f"LSP: Error in forward_to_lsp: {e}")
        finally:
            if process.stdin and not process.stdin.is_closing():
                process.stdin.close()

    async def forward_to_websocket():
        try:
            while True:
                line = await process.stdout.readline()
                if not line:
                    break
                
                line_str = line.decode('utf-8')
                if line_str.startswith("Content-Length: "):
                    try:
                        content_length = int(line_str.split(": ")[1].strip())
                        # Read the trailing \r\n after the content-length line
                        await process.stdout.readuntil(b"\r\n")
                        # Read body
                        body = await process.stdout.readexactly(content_length)
                        await websocket.send_text(body.decode('utf-8'))
                    except Exception as e:
                        print(f"LSP: Error parsing LSP message: {e}")
        except Exception as e:
            print(f"LSP: Error in forward_to_websocket: {e}")
        finally:
            await websocket.close()

    async def drain_stderr():
        try:
            while True:
                line = await process.stderr.readline()
                if not line:
                    break
                print(f"LSP-Sandbox: {line.decode('utf-8').strip()}")
        except Exception:
            pass

    try:
        # Run all three tasks
        await asyncio.gather(forward_to_lsp(), forward_to_websocket(), drain_stderr())
    except Exception as e:
        print(f"LSP: Connection loop error: {e}")
    finally:
        print(f"LSP: Cleaning up container {container_name}")
        subprocess.run(["docker", "kill", container_name], capture_output=True, check=False)
        subprocess.run(["docker", "rm", "-f", container_name], capture_output=True, check=False)

async def janitor_task():
    """Background task to clean up old containers and orphaned tmp files."""
    while True:
        try:
            print("Janitor: Starting cleanup cycle...")
            
            # Find all zenc-exec and zenc-lsp containers
            cmd = ["docker", "ps", "-a", "--filter", "name=zenc-", "--format", "{{.ID}}|{{.CreatedAt}}|{{.Names}}"]
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.stdout:
                import datetime
                now = datetime.datetime.now()
                
                for line in result.stdout.strip().split('\n'):
                    parts = line.split('|')
                    if len(parts) < 3: continue
                    
                    cid, created_at, name = parts
                    # Format: 2026-04-21 10:20:16 +0100 BST
                    # Simple check: if it's been running for more than an hour, kill it
                    # (LSP can run long, but exec should be fast)
                    
                    is_lsp = "lsp" in name
                    limit_minutes = 120 if is_lsp else 5  # LSP 2h limit, Exec 5m limit
                    
                    # For simplicity, we just prune all exited containers immediately
                    # and kill ones that 'look' old based on common sense
                    subprocess.run(["docker", "container", "prune", "-f", "--filter", "until=30m"], capture_output=True)
                    
            print("Janitor: Cleanup cycle complete.")
        except Exception as e:
            print(f"Janitor: Error during cleanup: {e}")
        
        await asyncio.sleep(3600) # Run every hour

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(janitor_task())

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
