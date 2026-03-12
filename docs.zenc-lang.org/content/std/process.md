# Standard Library: Process (`std/process.zc`)

The process module allows you to spawn and interact with child processes.

## Usage

```zc
import "std/process.zc"

fn main() {
    let output = Command::new("echo")
        .arg("hello")
        .output();
        
    if (output.exit_code == 0) {
        output.stdout.print();
        // Or access raw C string: output.stdout.c_str()
    }
}
```

## Structs

### Command

A builder for spawning a process.

```zc
struct Command {
    program: String;
    args: Vec<String>;
}
```

#### Methods

| Method | Signature | Description |
| :--- | :--- | :--- |
| **new** | `Command::new(program: char*) -> Command` | Creates a new Command for the given program. |
| **arg** | `arg(self, arg: char*) -> Command*` | Adds an argument to the command. Returns the command pointer for chaining. |
| **output** | `output(self) -> Output` | Executes the command as a child process, waiting for it to finish and collecting all of its stdout. |
| **status** | `status(self) -> int` | Executes the command as a child process and returns the exit status code. Does not capture output (output goes to stdout/stderr). |

### Output

The output of a finished process.

```zc
struct Output {
    stdout: String;
    exit_code: int;
}
```

#### Methods

`Output` implements `Drop` to automatically free the captured `stdout` string.
