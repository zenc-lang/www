+++
title = "std/math"
+++

# std/math

`Math` 模块提供了一组核心标准数学常量和函数。作为 Zen-C 封装，它封装了标准的浮点数学运算。

## 概览

- **静态方法**：所有方法通过 `Math` 结构体直接调用。
- **精度**：使用 `double` 类型进行高精度浮点运算。
- **全面性**：涵盖三角函数、指数、对数和舍入运算。
- **高效性**：直接封装并优化了 C 标准库函数。

## 使用方法

```zc
import "std/math.zc"

fn main() {
    let radius = 5.0;
    let area = Math::PI() * Math::pow(radius, 2.0);
    println "圆的面积: {area}";
}
```

## 常量

所有常量均为返回 `double` 的静态函数。

| 常量 | 说明 |
| :--- | :--- |
| **Math::PI()** | 阿基米德常数（约等于 3.14159）。 |
| **Math::E()** | 欧拉数（约等于 2.71828）。 |

## 方法

### 算术运算

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **abs** | `abs(x: double) -> double` | 返回 `x` 的绝对值。 |
| **sqrt** | `sqrt(x: double) -> double` | 返回 `x` 的平方根。 |
| **pow** | `pow(base: double, exp: double) -> double` | 返回 `base` 的 `exp` 次幂。 |
| **exp** | `exp(x: double) -> double` | 返回 `e` 的 `x` 次幂。 |
| **log** | `log(x: double) -> double` | 返回 `x` 的自然对数（以 e 为底）。 |
| **log10** | `log10(x: double) -> double` | 返回 `x` 的以 10 为底的对数。 |

### 三角函数

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **sin** | `sin(x: double) -> double` | 返回 `x`（弧度）的正弦值。 |
| **cos** | `cos(x: double) -> double` | 返回 `x`（弧度）的余弦值。 |
| **tan** | `tan(x: double) -> double` | 返回 `x`（弧度）的正切值。 |
| **asin** | `asin(x: double) -> double` | 返回 `x` 的反正弦值。 |
| **acos** | `acos(x: double) -> double` | 返回 `x` 的反余弦值。 |
| **atan** | `atan(x: double) -> double` | 返回 `x` 的反正切值。 |
| **atan2** | `atan2(y: double, x: double) -> double" | 返回 `y/x` 的反正切值。 |

### 舍入与取余

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **ceil** | `ceil(x: double) -> double` | 向上取整到最近的整数。 |
| **floor** | `floor(x: double) -> double` | 向下取整到最近的整数。 |
| **round** | `round(x: double) -> double` | 舍入到最近的整数。 |
| **mod** | `mod(x: double, y: double) -> double` | 计算 `x / y` 的浮点余数。 |

### 最小值 / 最大值

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **max** | `max(a: double, b: double) -> double` | 返回两个值中的较大者。 |
| **min** | `min(a: double, b: double) -> double` | 返回两个值中的较小者。 |
