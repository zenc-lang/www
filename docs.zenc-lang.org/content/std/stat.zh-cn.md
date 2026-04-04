+++
title = "std/sys/stat"
+++

# std/sys/stat

`std/sys/stat` 模块提供了用于检索扩展文件元数据和状态信息的接口，对 POSIX `sys/stat.h` 进行了封装。

## 概览

- **文件元数据**：检索文件大小、模式（权限）和时间戳。
- **时间戳**：以 Unix 时间戳形式访问访问时间、修改时间和更改时间。
- **Type Checking**：用于确定模式（mode）代表的是文件还是目录的辅助方法。

## 使用方法

```zc
import "std/sys/stat.zc"
import "std/io.zc"

fn main() {
    let res = FileStat::stat("myfile.txt");
    if (res.is_some()) {
        let st = res.unwrap();
        println "大小: {st.size} 字节";
        println "权限: {st.mode}";
        
        if (FileStat::is_dir(st.mode)) {
            println "这是一个目录。";
        }
    }
}
```

## 结构体定义

### `Stat`
包含 Unix 风格的文件元数据。
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

## 方法

### `FileStat` 方法

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **stat** | `FileStat::stat(path: char*) -> Option<Stat>` | 返回给定路径的元数据，如果失败则返回 `None`。 |
| **is_dir** | `FileStat::is_dir(mode: u32) -> bool` | 检查给定的模式是否代表一个目录。 |
| **is_file** | `FileStat::is_file(mode: u32) -> bool` | 检查给定的模式是否代表一个普通文件。 |
