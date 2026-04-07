from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import subprocess
import tempfile
import os
import shutil
import re

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

        # Prepare Docker command
        # Syntax: docker run --rm -v /local/path:/container/path image command
        # We'll use the user's Docker image: zenc_sandbox
        # Adjusting execution to match the Zen-C compiler flow
        try:
            # Security Constraints:
            # - --network none: Disable all network access (prevent botnet/mining)
            # - --cpus 0.5: Throttle to 50% of CPU time
            # - -m 128m: Cap RAM at 128 MB (prevents OOMs)
            # - --pids-limit 64: Prevent fork-bombs
            # - --read-only: Lock the entire filesystem
            # - --tmpfs /tmp:rw,nosuid,size=64m: Only allow writes strictly to 64MB of RAM disk (allows executing the compiled binary)
            # - --cap-drop ALL: Strip all Linux kernel capabilities
            # - --security-opt no-new-privileges: Stop privilege escalation
            cmd = [
                "docker", "run", "--rm",
                "--network", "none",
                "--cpus", "0.5",
                "-m", "128m",
                "--pids-limit", "64",
                "--read-only",
                "--tmpfs", "/tmp:rw,nosuid,size=64m",
                "--cap-drop", "ALL",
                "--security-opt", "no-new-privileges=true",
                "-v", f"{zc_file}:/tmp/main.zc:ro",
                "zenc_sandbox",
                "sh", "-c", "timeout -s 9 10s zc /tmp/main.zc -o /tmp/main && timeout -s 9 5s /tmp/main"
            ]

            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=45 # Outer timeout
            )

            output = result.stdout + result.stderr
            
            # Clean up noisy compiler logs from standard output to keep playground execution clean
            # We must aggressively strip ANSI color codes first because the compiler uses colored text (e.g. \x1b[32mCompiling)
            ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')
            clean_lines = []
            
            for line in output.splitlines():
                line_plain = ansi_escape.sub('', line)
                
                # Check against the uncolored text
                if "Compiling /tmp/" in line_plain or "Finished build in" in line_plain:
                    continue
                
                # Keep the original colored line so user's own colored outputs aren't magically destroyed
                clean_lines.append(line)
            
            output = "\n".join(clean_lines).strip()

            return {"output": output, "error": "" if result.returncode == 0 else "Execution failed"}

        except subprocess.TimeoutExpired:
            return {"output": "Error: Execution timed out.", "error": "timeout"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
