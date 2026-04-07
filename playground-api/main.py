from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import subprocess
import tempfile
import os
import shutil

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
            cmd = [
                "docker", "run", "--rm",
                "-v", f"{zc_file}:/tmp/main.zc:ro",
                "zenc_sandbox",
                "sh", "-c", "timeout -s 9 30s zc /tmp/main.zc -o /tmp/main && timeout -s 9 10s /tmp/main"
            ]

            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=45 # Outer timeout
            )

            output = result.stdout + result.stderr
            return {"output": output, "error": "" if result.returncode == 0 else "Execution failed"}

        except subprocess.TimeoutExpired:
            return {"output": "Error: Execution timed out.", "error": "timeout"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
