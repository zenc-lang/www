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
    code: str

@app.post("/run")
async def run_code(request: RunRequest):
    # Create a temporary directory for the execution
    with tempfile.TemporaryDirectory() as tmp_dir:
        zc_file = os.path.join(tmp_dir, "main.zc")
        with open(zc_file, "w") as f:
            f.write(request.code)

        container_name = f"zenc-exec-{uuid.uuid4().hex[:8]}"
        
        docker_cmd = [
            "docker", "run", "--rm", "-t",
            "--name", container_name,
            "--network", "none",
            "--cpus", "0.5",
            "-m", "128m",
            "--pids-limit", "64",
            "--read-only",
            "--tmpfs", "/tmp:rw,nosuid,exec,size=64m",
            "--cap-drop", "ALL",
            "--security-opt", "no-new-privileges=true",
            "-v", f"{zc_file}:/tmp/main.zc:ro",
            "zenc_sandbox",
            "sh", "-c", "timeout -s 9 10 zc /tmp/main.zc -o /tmp/main && timeout -s 9 5 /tmp/main"
        ]

        try:
            try:
                result = subprocess.run(
                    docker_cmd,
                    capture_output=True,
                    text=True,
                    stdin=subprocess.DEVNULL,
                    timeout=15 
                )
            except subprocess.TimeoutExpired:
                return {"output": "Execution reached the hard 15s time limit.", "error": "timeout"}

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
