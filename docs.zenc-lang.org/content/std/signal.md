# std/sys/signal

The `std/sys/signal` module provides primitives for handling system signals, wrapping POSIX `signal.h` functionality.

## Overview

- **Signal Interception**: Define custom handlers for signals like `SIGINT` (Ctrl+C).
- **Graceful Termination**: Use signal handlers to perform cleanup before exiting.
- **Common Constants**: Provides cross-platform definitions for standard signals.

## Usage

```zc
import "std/sys/signal.zc"
import "std/io.zc"

fn on_interrupt(sig: int) {
    println "Received SIGINT ({sig}). Cleaning up...";
    exit(0);
}

fn main() {
    Signal::set_handler(Z_SIGINT, on_interrupt);
    println "Waiting for Ctrl+C...";
    while(true) {}
}
```

## Struct Definition

```zc
struct Signal {}
```

## Methods

### `Signal` Methods

| Method | Signature | Description |
| :--- | :--- | :--- |
| **set_handler** | `Signal::set_handler(sig: int, handler: fn*(int)) -> fn*(int)` | Registers a handler for the given signal and returns the previous handler. |

## Constants

### Standard Signals
- `Z_SIGINT`: Interrupt from keyboard (Ctrl+C).
- `Z_SIGILL`: Illegal instruction.
- `Z_SIGABRT`: Abort signal.
- `Z_SIGFPE`: Floating point exception.
- `Z_SIGSEGV`: Segmentation violation (invalid memory access).
- `Z_SIGTERM`: Termination signal.
