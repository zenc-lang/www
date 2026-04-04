+++
title = "std/sys/info"
+++

# std/sys/info

`std/sys/info` 模块提供用于检索系统标识和信息的工具，对 POSIX `uname` 进行了封装。

## 概览

- **系统标识**：访问操作系统名称、内核版本、硬件架构等。
- **符合 RAII**：`Uname` 结构体自动管理其内部字符串的内存。

## 使用方法

```zc
import "std/sys/info.zc"
import "std/io.zc"

fn main() {
    let info = SysInfo::get_uname();
    println "操作系统 (OS): {info.sysname}";
    println "内核: {info.release}";
    println "架构: {info.machine}";
}
```

## 结构体定义

### `Uname`
包含系统标识字段。
```zc
struct Uname {
    sysname: String;
    nodename: String;
    release: String;
    version: String;
    machine: String;
}
```

## 方法

### `SysInfo` 方法

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **get_uname** | `SysInfo::get_uname() -> Uname` | 返回包含各种系统字符串的 `Uname` 结构体。 |

## 内存管理
- `Uname` 实现了 `impl Drop`，当其超出作用域时会自动释放其内部的 `String` 缓冲区。
