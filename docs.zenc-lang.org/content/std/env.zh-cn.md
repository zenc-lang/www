+++
title = "std/env"
+++

# std/env

`std/env` 模块提供对进程环境变量的跨平台访问。

## 概览

- **键值访问**：用于获取、设置和取消设置环境变量的简单 API。
- **借用或拥有**：在 `get`（返回借用的 C 字符串）和 `get_dup`（返回拥有的、堆分配的 `String`）之间进行选择。
- **跨平台**：安全地抽象了底层系统调用，用于环境操作。

## 使用方法

```zc
import "std/env.zc"

fn main() {
    // 设置环境变量
    Env::set("MY_APP_MODE", "development");

    // 获取（借用型）
    match Env::get("MY_APP_MODE") {
        Some(val) => println "模式: {val}",
        None => println "未设置模式"
    }

    // 获取（拥有的 String，用于 RAII）
    match Env::get_dup("HOME") {
        Some(home) => {
             println "主目录: {home}";
             // home 会被自动释放
        }
        None => println "未找到 HOME"
    }
}
```

## 枚举定义

```zc
enum EnvRes {
    OK,
    ERR,
}
```

## 方法

### 访问与查询

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **get** | `Env::get(name: char*) -> Option<char*>` | 获取指向环境变量的借用指针。不要对其进行释放。 |
| **get_dup** | `Env::get_dup(name: char*) -> Option<String>` | 以新的 `String` 对象形式获取环境变量。 |

### 修改

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **set** | `Env::set(name: char*, value: char*) -> EnvRes` | 设置或更新环境变量。 |
| **unset** | `Env::unset(name: char*) -> EnvRes` | 从当前进程中移除环境变量。 |
