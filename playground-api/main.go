package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"time"
)

type RunRequest struct {
	Code string `json:"code"`
}

type RunResponse struct {
	Output string `json:"output"`
	Error  string `json:"error"`
}

func main() {
	http.HandleFunc("/run", handleRun)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Printf("Server listening on port %s...\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func handleRun(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req RunRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	// Create a temporary workspace
	tmpDir, err := ioutil.TempDir("", "zenc-playground-*")
	if err != nil {
		http.Error(w, "Failed to create temp dir", http.StatusInternalServerError)
		return
	}
	defer os.RemoveAll(tmpDir)

	zcFile := filepath.Join(tmpDir, "main.zc")
	if err := ioutil.WriteFile(zcFile, []byte(req.Code), 0644); err != nil {
		http.Error(w, "Failed to write code to file", http.StatusInternalServerError)
		return
	}

	// Prepare Docker command
	// We'll use the image provided: zenc_sandbox
	// Assuming the image has 'zenc' compiler and we can output to a file and run it.
	// Adjusting the command based on your Discord bot's 'sh -c timeout' pattern.
	
	dockerCmd := exec.Command("docker", "run", "--rm",
		"-v", zcFile+":/tmp/main.zc:ro",
		"zenc_sandbox",
		"sh", "-c", "timeout -s 9 30s zenc /tmp/main.zc -o /tmp/main && timeout -s 9 10s /tmp/main",
	)

	output, err := dockerCmd.CombinedOutput()
	
	resp := RunResponse{
		Output: string(output),
	}
	if err != nil {
		resp.Error = err.Error()
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}
