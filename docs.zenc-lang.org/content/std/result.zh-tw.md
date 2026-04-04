+++
title = "std/result"
+++

# std/result

`Result<T>` 是 Zen-C 中錯誤處理的標準類型。它要麼代表成功（`Ok`），包含類型為 `T` 的值；要麼代表失敗（`Err`），包含一個字串形式的錯誤訊息。

## 概覽

- **安全**：強制要求顯式處理成功和失敗的路徑。
- **具資訊性**：`Err` 情況攜帶描述性的錯誤訊息。
- **通用（Generic）**：支援任何成功值類型 `T`。
- **整合性**：與基於 `Result` 的宏和模式無縫運作，實現簡潔的錯誤傳遞。

## 使用方法

```zc
import "std/result.zc"

fn divide(a: int, b: int) -> Result<int> {
    if (b == 0) {
        return Result<int>::Err("除以零");
    }
    return Result<int>::Ok(a / b);
}

fn main() {
    match divide(10, 0) {
        Ok(val) => println "結果: {val}",
        Err(e)  => println "錯誤: {e}"
    }
}
```

## 結構體定義

```zc
struct Result<T> {
    is_ok: bool;
    val: T;
    err: char*;
}
```

## 方法

### 構造

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **Ok** | `Result<T>::Ok(v: T) -> Result<T>` | 建立一個包含 `v` 的成功結果。 |
| **Err** | `Result<T>::Err(e: char*) -> Result<T>` | 建立一個訊息為 `e` 的錯誤結果。 |

### 查詢

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **is_ok** | `is_ok(self) -> bool` | 如果結果為 `Ok` 則返回 `true`。 |
| **is_err** | `is_err(self) -> bool` | 如果結果為 `Err` 則返回 `true`。 |

### 提取

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **unwrap** | `unwrap(self) -> T` | 返回 ok 值。如果是 `Err` 則帶錯誤訊息發出恐慌（panic）。 |
| **unwrap_ref** | `unwrap_ref(self) -> T*` | 返回到 ok 值的指標。如果是 `Err` 則發出恐慌。 |
| **expect** | `expect(self, msg: char*) -> T` | 返回數值，如果是 `Err` 則帶著 `msg` 與錯誤訊息發出恐慌。 |

## 記憶體管理

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **forget** | `forget(self)` | 清零 ok 值，而不呼叫析構函數或釋放記憶體。 |
