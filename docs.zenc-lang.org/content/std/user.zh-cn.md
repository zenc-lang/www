+++
title = "std/sys/user"
+++

# std/sys/user

`std/sys/user` 模块提供对用户和组标识信息的访问，包装了 POSIX 的 `unistd.h`。

## 概览

- **用户身份**：检索实际和有效的用户 ID (UID) 和组 ID (GID)。
- **进程上下文**：在系统实用程序中用于权限检查和许可管理。

## 使用方法

```zc
import "std/sys/user.zc"
import "std/io.zc"

fn main() {
    println "当前 UID: {User::get_uid()}";
    println "当前 GID: {User::get_gid()}";
    
    if (User::get_euid() == 0) {
        println "以 root 权限运行。";
    }
}
```

## 结构体定义

```zc
struct User {}
```

## 方法

### `User` 方法

| 方法 | 签名 | 描述 |
| :--- | :--- | :--- |
| **get_uid** | `User::get_uid() -> u32` | 返回当前进程的实际用户 ID。 |
| **get_gid** | `User::get_gid() -> u32` | 返回当前进程的实际组 ID。 |
| **get_euid** | `User::get_euid() -> u32` | 返回有效用户 ID。 |
| **get_egid** | `User::get_egid() -> u32` | 返回有效组 ID。 |
