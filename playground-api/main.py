from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import subprocess
import tempfile
import os
import shutil
import re
import uuid
import shlex

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

        # Generate a unique container name so we can kill it specifically if it hangs
        container_name = f"zenc-exec-{uuid.uuid4().hex[:8]}"
        
        # Prepare Docker command
        # Security Constraints:
        # - --network none: Disable all network access
        # - --cpus 0.5: Throttle to 50% of CPU time
        # - -m 128m: Cap RAM at 128 MB
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
                # We execute Docker directly now. 'script' was causing signal isolation issues.
                # 'docker run -t' already provides the TTY we need for colored output.
                result = subprocess.run(
                    docker_cmd,
                    capture_output=True,
                    text=True,
                    stdin=subprocess.DEVNULL,
                    timeout=15 # Outer timeout synced with internal limits (10s compile + 5s run)
                )
            except subprocess.TimeoutExpired:
                return {"output": "Execution reached the hard 15s time limit.", "error": "timeout"}

            output = result.stdout + result.stderr
            output = output.replace('\r\n', '\n')
            
            # Clean up noisy compiler logs from standard output
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
            # ROBUST CLEANUP:
            # Even if subprocess.run times out or the request is cancelled, we MUST ensure the container is gone.
            # Using --rm above is good, but if the docker client is killed abruptly, the daemon might not remove it.
            # Explicitly killing it by name ensures no leaks.
            subprocess.run(["docker", "kill", container_name], capture_output=True, check=False)
            subprocess.run(["docker", "rm", "-f", container_name], capture_output=True, check=False)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
