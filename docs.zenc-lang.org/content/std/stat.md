# std/sys/stat

The `std/sys/stat` module provides an interface for retrieving extended file metadata and status information, wrapping POSIX `sys/stat.h`.

## Overview

- **File Metadata**: Retrieve file size, mode (permissions), and timestamps.
- **Timestamps**: Access access, modification, and change times as Unix timestamps.
- **Type Checking**: Helper methods to determine if a mode represents a file or directory.

## Usage

```zc
import "std/sys/stat.zc"
import "std/io.zc"

fn main() {
    let res = FileStat::stat("myfile.txt");
    if (res.is_some()) {
        let st = res.unwrap();
        println "Size: {st.size} bytes";
        println "Permissions: {st.mode}";
        
        if (FileStat::is_dir(st.mode)) {
            println "It is a directory.";
        }
    }
}
```

## Struct Definition

### `Stat`
Contains Unix-style file metadata.
```zc
struct Stat {
    mode: u32;
    size: u64;
    atime: i64;
    mtime: i64;
    ctime: i64;
    uid: u32;
    gid: u32;
}
```

## Methods

### `FileStat` Methods

| Method | Signature | Description |
| :--- | :--- | :--- |
| **stat** | `FileStat::stat(path: char*) -> Option<Stat>` | Returns metadata for the given path, or `None` if it fails. |
| **is_dir** | `FileStat::is_dir(mode: u32) -> bool` | Checks if the given mode represents a directory. |
| **is_file** | `FileStat::is_file(mode: u32) -> bool` | Checks if the given mode represents a regular file. |
