+++
title = "std/env"
+++

# std/env

`std/env` 模組提供了跨平台的行程環境變數存取功能。

## 概覽

- **鍵值存取**：簡單的 API，用於獲取、設置和清除環境變數。
- **借用或擁有**：在 `get`（返回借用的 C 字串）和 `get_dup`（返回擁有的、堆分配的 `String`）之間選擇。
- **跨平台**：安全地抽象了用於環境變數操作的底層系統調用。

## 使用方法

```zc
import "std/env.zc"

fn main() {
    // 設置環境變數
    Env::set("MY_APP_MODE", "development");

    // 獲取（借用 Borrowed）
    match Env::get("MY_APP_MODE") {
        Some(val) => println "模式: {val}",
        None => println "模式未設置"
    }

    // 獲取（擁有的 String，用於 RAII）
    match Env::get_dup("HOME") {
        Some(home) => {
             println "家目錄: {home}";
             // home 會自動釋放
        }
        None => println "找不到 HOME"
    }
}
```

## 枚舉定義

```zc
enum EnvRes {
    OK,
    ERR,
}
```

## 方法

### 訪問與查詢

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **get** | `Env::get(name: char*) -> Option<char*>` | 獲取環境變數的借用指標。請勿手動釋放。 |
| **get_dup** | `Env::get_dup(name: char*) -> Option<String>` | 獲取環境變數作為一個新的 `String` 物件。 |

### 修改

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **set** | `Env::set(name: char*, value: char*) -> EnvRes` | 設置或更新環境變數。 |
| **unset** | `Env::unset(name: char*) -> EnvRes` | 從目前行程中移除環境變數。 |
