+++
title = "std/bigint"
+++

# std/bigint

`BigInt` 為 Zen-C 提供任意精度的整數算術。它允許進行超出 `u64` 等標準數值類型容量的整數計算。

## 概覽

- **任意精度**：數字大小僅受可用記憶體限制。
- **十進位表示**：目前為了簡單起見使用簡單的 10 進位表示。
- **RAII**：為內部數字儲存實現了 `Drop` trait，以進行自動記憶體管理。
- **便捷性**：支援運算子重載，提供直觀的算術運算。

## 使用方法

```zc
import "std/bigint.zc"

fn main() {
    let a = BigInt::from_int(1_000_000_000_000_000);
    let b = BigInt::from_int(2_000_000_000_000_000);
    
    // 使用運算子重載
    let sum = a + b; 
    
    let s = sum.to_string();
    println "總和: {s}";
    free(s);
} // sum, a, 和 b 在此處自動釋放
```

## 結構體定義

```zc
struct BigInt {
    digits: Vec<u8>*;
}
```

## 方法

### 構造

| 方法 | 簽名 | 说明 |
| :--- | :--- | :--- |
| **new** | `BigInt::new() -> BigInt` | 建立一個初始化為 0 的新 `BigInt`。 |
| **from_int** | `BigInt::from_int(val: u64) -> BigInt` | 從 64 位元整數建立一個新的 `BigInt`。 |

### 修改

| 方法 | 簽名 | 说明 |
| :--- | :--- | :--- |
| **add_in_place** | `add_in_place(self, other: BigInt)` | 通過變更內部狀態將 `other` 加到 `self` 中。 |

### 工具方法

| 方法 | 簽名 | 说明 |
| :--- | :--- | :--- |
| **clone** | `clone(self) -> BigInt` | 返回 `BigInt` 的深拷貝。 |
| **to_string** | `to_string(self) -> char*` | 返回一個堆分配（heap-allocated）字串表示。 |

## 運算子

| 運算子 | 方法 | 說明 |
| :--- | :--- | :--- |
| `+` | **add** | 返回一個包含兩個數值之和的新 `BigInt`。 |
| `{}` | **to_string** | 自動在格式化字串中啟用插值。 |

## 記憶體管理

| 方法 | 簽名 | 说明 |
| :--- | :--- | :--- |
| **free_mem** | `free_mem(self)` | 手動釋放底層 `Vec` 和 `BigInt` 儲存空間。 |
| **Trait** | `impl Drop for BigInt` | 超出作用域時自動調用 `free_mem()`。 |
