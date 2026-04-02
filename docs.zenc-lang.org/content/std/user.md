# std/sys/user

The `std/sys/user` module provides access to user and group identification information, wrapping POSIX `unistd.h`.

## Overview

- **User Identity**: Retrieve real and effective User IDs (UID) and Group IDs (GID).
- **Process Context**: Useful for privilege checking and permission management in system utilities.

## Usage

```zc
import "std/sys/user.zc"
import "std/io.zc"

fn main() {
    println "Current UID: {User::get_uid()}";
    println "Current GID: {User::get_gid()}";
    
    if (User::get_euid() == 0) {
        println "Running with root privileges.";
    }
}
```

## Struct Definition

```zc
struct User {}
```

## Methods

### `User` Methods

| Method | Signature | Description |
| :--- | :--- | :--- |
| **get_uid** | `User::get_uid() -> u32` | Returns the real User ID of the current process. |
| **get_gid** | `User::get_gid() -> u32` | Returns the real Group ID of the current process. |
| **get_euid** | `User::get_euid() -> u32` | Returns the effective User ID. |
| **get_egid** | `User::get_egid() -> u32` | Returns the effective Group ID. |
