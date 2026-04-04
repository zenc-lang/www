+++
title = "std/random"
+++

# std/random

`std/random` 模块为 POSIX `<stdlib.h>` 中的函数提供了一个惯用的、面向对象的伪随机数生成器 (PRNG) 封装。

## 使用方法

```zc
import "std/random.zc"

fn main() {
    // 自动使用当前时间作为种子初始化生成器
    let rng = Random::new();

    // 生成随机整数
    let bounded = rng.next_int_range(1, 100); // 1 到 100 之间（含）
    
    println "摇出的点数: {bounded}";
}
```

## 结构体定义

```zc
struct Random {
    seed: U32;
}
```

## 方法

### 初始化

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **new** | `Random::new() -> Random` | 创建一个新的随机数生成器，使用当前系统时间作为种子。 |
| **from_seed** | `Random::from_seed(seed: U32) -> Random` | 使用特定的种子创建一个新的随机数生成器。 |

### 生成

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **next_int** | `next_int(self) -> int` | 返回原始范围 `[0, RAND_MAX]` 内的一个随机整数。 |
| **next_int_range** | `next_int_range(self, min: int, max: int) -> int` | 返回 `[min, max]` 范围内（含）的一个随机整数。 |
| **next_double** | `next_double(self) -> double` | 返回 `[0.0, 1.0)` 范围内的一个随机浮点数。 |
| **next_bool** | `next_bool(self) -> bool` | 返回一个随机布尔值。 |
