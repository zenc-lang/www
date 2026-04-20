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

            output = result.stdout + result.stderr
            output = output.replace('\r\n', '\n')
            
            ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')
            clean_lines = []
            
            for line in output.splitlines():
                line_plain = ansi_escape.sub('', line)
                if "Compiling /tmp/" in line_plain or "Finished build in" in line_plain:
                    continue
                clean_lines.append(line)
            
            output = "\n".join(clean_lines).strip()
            return {"output": output, "error": "" if result.returncode == 0 else "Execution failed"}

        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
        finally:
            subprocess.run(["docker", "kill", container_name], capture_output=True, check=False)
            subprocess.run(["docker", "rm", "-f", container_name], capture_output=True, check=False)

@app.websocket("/api/lsp")
async def lsp_proxy(websocket: WebSocket):
    await websocket.accept()
    
    container_name = f"zenc-lsp-{uuid.uuid4().hex[:8]}"
    
    # Persistent LSP sandbox
    docker_cmd = [
        "docker", "run", "--rm", "-i",
        "--name", container_name,
        "--network", "none",
        "--cpus", "0.5",
        "-m", "256m", # LSP needs a bit more RAM for indexing
        "--pids-limit", "64",
        "zenc_sandbox",
        "zc", "lsp"
    ]
    
    process = await asyncio.create_subprocess_exec(
        *docker_cmd,
        stdin=asyncio.subprocess.PIPE,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE
    )
    
    async def forward_to_lsp():
        try:
            while True:
                data = await websocket.receive_text()
                # LSP expects Content-Length header
                content = data.encode('utf-8')
                header = f"Content-Length: {len(content)}\r\n\r\n"
                process.stdin.write(header.encode('utf-8') + content)
                await process.stdin.drain()
        except Exception:
            pass
        finally:
            if not process.stdin.is_closing():
                process.stdin.close()

    async def forward_to_websocket():
        try:
            while True:
                # Read LSP headers
                line = await process.stdout.readline()
                if not line:
                    break
                
                line = line.decode('utf-8')
                if line.startswith("Content-Length: "):
                    content_length = int(line.split(": ")[1].strip())
                    
                    # Read empty line after headers
                    await process.stdout.readline()
                    
                    # Read body
                    body = await process.stdout.readexactly(content_length)
                    await websocket.send_text(body.decode('utf-8'))
        except Exception:
            pass
        finally:
            await websocket.close()

    try:
        # Run both forwarders concurrently
        await asyncio.gather(forward_to_lsp(), forward_to_websocket())
    except Exception:
        pass
    finally:
        # Cleanup container
        subprocess.run(["docker", "kill", container_name], capture_output=True, check=False)
        subprocess.run(["docker", "rm", "-f", container_name], capture_output=True, check=False)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
