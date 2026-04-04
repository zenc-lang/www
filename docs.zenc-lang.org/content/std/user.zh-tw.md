+++
title = "std/sys/user"
+++

# std/sys/user

`std/sys/user` 模組提供了對使用者和群組識別資訊的存取，封裝了 POSIX `unistd.h`。

## 概覽

- **使用者身分**：檢索實際和有效的使用者 ID (UID) 及群組 ID (GID)。
- **行程上下文**：在系統工具中用於權限檢查和存取管理非常有用。

## 使用方法

```zc
import "std/sys/user.zc"
import "std/io.zc"

fn main() {
    println "目前 UID: {User::get_uid()}";
    println "目前 GID: {User::get_gid()}";
    
    if (User::get_euid() == 0) {
        println "正以 root 權限執行。";
    }
}
```

## 結構體定義

```zc
struct User {}
```

## 方法

### `User` 方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **get_uid** | `User::get_uid() -> u32` | 返回目前行程的實際使用者 ID。 |
| **get_gid** | `User::get_gid() -> u32` | 返回目前行程的實際群組 ID。 |
| **get_euid** | `User::get_euid() -> u32` | 返回有效使用者 ID。 |
| **get_egid** | `User::get_egid() -> u32` | 返回有效群組 ID。 |
