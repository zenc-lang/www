+++
title = "std/bigfloat"
+++

# std/bigfloat

`BigFloat` 為 Zen-C 提供任意精度的十進位浮點運算。它被實現為縮放後的 `BigInt`，允許進行高精度計算而不會產生二進位捨入誤差。

## 概覽

- **任意精度**：支援任何大小的十進位數字，僅受記憶體限制。
- **縮放表示**：使用 `BigInt` 數值和整數 `scale`（縮放比例）來表示十進位值。
- **精度控制**：輕鬆對齊縮放比例以進行精確的加法和減法。
- **RAII**：底層數值的記憶體透過 `Drop` trait 自動管理。

## 使用方法

```zc
import "std/bigfloat.zc"

fn main() {
    let a = BigFloat::from_int(123);
    a.scale = 2; // 代表 1.23
    
    let b = BigFloat::from_int(4567);
    b.scale = 3; // 代表 4.567
    
    let sum = a.add(b);
    
    let s = sum.to_string();
    println "總和: {s}"; // 總和: 5.797
    free(s);
} // a, b, 和 sum 在此處自動釋放
```

## 結構體定義

```zc
struct BigFloat {
    magnitude: BigInt;
    scale: int;
}
```

## 方法

### 構造

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **new** | `BigFloat::new() -> BigFloat` | 建立一個初始化為 0.0 的新 `BigFloat`。 |
| **from_int** | `BigFloat::from_int(val: u64) -> BigFloat` | 從整數建立一個縮放比例為 0 的 `BigFloat`。 |

### 修改

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **add** | `add(self, other: BigFloat) -> BigFloat` | 將兩個 `BigFloat` 相加，自動對齊其縮放比例。返回一個新的 `BigFloat`。 |
| **align_scale** | `align_scale(self, target_scale: int)` | 通過移動數值將 `BigFloat` 的縮放比例增加到 `target_scale`。 |

### 工具方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **clone** | `clone(self) -> BigFloat` | 返回 `BigFloat` 的深拷貝。 |
| **to_string** | `to_string(self) -> char*` | 返回帶有小數點的堆分配（heap-allocated）字串表示。 |

## 記憶體管理

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **free_mem** | `free_mem(self)` | 手動釋放底層 `BigInt` 記憶體。 |
| **Trait** | `impl Drop for BigFloat` | 超出作用域時自動調用 `free_mem()`。 |
