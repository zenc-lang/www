# std/sys/info

The `std/sys/info` module provides utilities for retrieving system identification and information, wrapping POSIX `uname`.

## Overview

- **System Identification**: Access OS name, kernel version, hardware architecture, and more.
- **RAII Compliance**: The `Uname` struct automatically manages the memory for its internal strings.

## Usage

```zc
import "std/sys/info.zc"
import "std/io.zc"

fn main() {
    let info = SysInfo::get_uname();
    println "OS: {info.sysname}";
    println "Kernel: {info.release}";
    println "Arch: {info.machine}";
}
```

## Struct Definition

### `Uname`
Contains system identification fields.
```zc
struct Uname {
    sysname: String;
    nodename: String;
    release: String;
    version: String;
    machine: String;
}
```

## Methods

### `SysInfo` Methods

| Method | Signature | Description |
| :--- | :--- | :--- |
| **get_uname** | `SysInfo::get_uname() -> Uname` | Returns a `Uname` struct containing various system strings. |

## Memory Management
- `Uname` implements `impl Drop` and will automatically free its internal `String` buffers when it goes out of scope.
