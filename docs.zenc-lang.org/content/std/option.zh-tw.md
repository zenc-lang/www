+++
title = "std/option"
+++

# std/option

`Option<T>` 代表一個選擇性的值：每個 `Option` 要麼是 `Some` 並包含一個值，要麼是 `None`。它通常用於處理值的缺失，而無需訴諸於空指標（null pointers）。

## 概覽

- **安全**：鼓勵對 `None` 情況進行顯式處理。
- **通用（Generic）**：可以封裝任何類型 `T`。
- **零成本**：編譯後為一個帶有布林標誌的簡單結構體。
- **便捷性**：提供了許多用於解包和轉換數值的工具方法。

## 使用方法

```zc
import "std/option.zc"

fn main() {
    let val = Option<int>::Some(10);
    
    if (val.is_some()) {
        println "值為 {val.unwrap()}";
    }
    
    let empty = Option<int>::None();
    let x = empty.unwrap_or(0);
}
```

## 結構體定義

```zc
struct Option<T> {
    is_some: bool;
    val: T;
}
```

## 方法

### 構造

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **Some** | `Option<T>::Some(v: T) -> Option<T>` | 建立一個包含 `v` 的 `Some` 選項。 |
| **None** | `Option<T>::None() -> Option<T>` | 建立一個 `None` 選項。 |

### 查詢

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **is_some** | `is_some(self) -> bool` | 如果選項為 `Some` 則返回 `true`。 |
| **is_none** | `is_none(self) -> bool` | 如果選項為 `None` 則返回 `true`。 |

### 提取

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **unwrap** | `unwrap(self) -> T` | 返回所包含的值。如果為 `None` 則發出恐慌（panic）。 |
| **unwrap_ref** | `unwrap_ref(self) -> T*` | 返回到所包含值的指標。如果為 `None` 則發出恐慌。 |
| **unwrap_or** | `unwrap_or(self, def: T) -> T` | 返回所包含的值或 `def`。 |
| **expect** | `expect(self, msg: char*) -> T` | 返回數值，或帶著 `msg` 發出恐慌。 |
| **or_else** | `or_else(self, other: Option<T>) -> Option<T>` | 如果是 `Some` 則返回該選項，否則返回 `other`。 |

## 記憶體管理

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **forget** | `forget(self)` | 將內部數值清零，而不呼叫析構函數或釋放記憶體。 |
