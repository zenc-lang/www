+++
title = "std/random"
+++

# std/random

`std/random` 模組提供了一個慣用的、物件導向的偽隨機數生成器（PRNG）封裝，對應的是 POSIX `<stdlib.h>` 中的函數。

## 使用方法

```zc
import "std/random.zc"

fn main() {
    // 使用目前時間自動為生成器設置種子（seed）
    let rng = Random::new();

    // Generate random integers
    let bounded = rng.next_int_range(1, 100); // 1 到 100（含）
    
    println "隨機結果: {bounded}";
}
```

## 結構體定義

```zc
struct Random {
    seed: U32;
}
```

## 方法

### 初始化

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **new** | `Random::new() -> Random` | 建立一個以目前系統時間為種子的新隨機生成器。 |
| **from_seed** | `Random::from_seed(seed: U32) -> Random` | 使用特定種子建立一個新的隨機生成器。 |

### 生成

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **next_int** | `next_int(self) -> int` | 返回原始範圍 `[0, RAND_MAX]` 內的一個隨機整數。 |
| **next_int_range** | `next_int_range(self, min: int, max: int) -> int` | 返回 `[min, max]` 範圍內的一個隨機整數（含端點）。 |
| **next_double** | `next_double(self) -> double` | 返回 `[0.0, 1.0)` 範圍內的一個隨機浮點數。 |
| **next_bool** | `next_bool(self) -> bool` | 返回一個隨機布林值。 |
