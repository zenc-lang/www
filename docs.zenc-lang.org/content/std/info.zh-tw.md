+++
title = "std/sys/info"
+++

# std/sys/info

`std/sys/info` 模組提供了用於檢索系統識別和資訊的工具，對 POSIX `uname` 進行了封裝。

## 概覽

- **系統識別**：訪問 OS 名稱、核心版本、硬體架構等資訊。
- **符合 RAII**：`Uname` 結構體會自動管理其內部字串的記憶體。

## 使用方法

```zc
import "std/sys/info.zc"
import "std/io.zc"

fn main() {
    let info = SysInfo::get_uname();
    println "OS: {info.sysname}";
    println "核心版本: {info.release}";
    println "架構: {info.machine}";
}
```

## 結構體定義

### `Uname`
包含系統識別欄位。
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

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **get_uname** | `SysInfo::get_uname() -> Uname` | 返回一個包含各種系統字串的 `Uname` 結構體。 |

## 記憶體管理
- `Uname` 實現了 `impl Drop`，當其超出作用域時會自動釋放其內部 `String` 緩衝區。
