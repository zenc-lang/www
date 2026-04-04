+++
title = "std/math"
+++

# std/math

`Math` 模組提供核心的標準數學常數和函數。它作為 Zen-C 對標準浮點數學運算的封裝。

## 概覽

- **靜態方法**：所有方法均直接在 `Math` 結構體上調用。
- **精度**：使用 `double` 進行高精度浮點運算。
- **全面**：涵蓋三角函數、指數、對數和捨入（rounding）運算。
- **高效力**：直接封裝優化的 C 庫函數。

## 使用方法

```zc
import "std/math.zc"

fn main() {
    let radius = 5.0;
    let area = Math::PI() * Math::pow(radius, 2.0);
    println "圓面積: {area}";
}
```

## 常數

所有常數均為返回 `double` 的靜態函數。

| 常數 | 說明 |
| :--- | :--- |
| **Math::PI()** | 阿基米德常數（約 3.14159）。 |
| **Math::E()** | 歐拉數（約 2.71828）。 |

## 方法

### 算術運算

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **abs** | `abs(x: double) -> double` | 返回 `x` 的絕對值。 |
| **sqrt** | `sqrt(x: double) -> double` | 返回 `x` 的平方根。 |
| **pow** | `pow(base: double, exp: double) -> double` | 返回 `base` 的 `exp` 次方。 |
| **exp** | `exp(x: double) -> double` | 返回 `e` 的 `x` 次方。 |
| **log** | `log(x: double) -> double` | 返回 `x` 的自然對數（以 e 為底）。 |
| **log10** | `log10(x: double) -> double` | 返回 `x` 的常用對數（以 10 為底）。 |

### 三角函數

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **sin** | `sin(x: double) -> double` | 返回 `x` 的正弦值（弧度）。 |
| **cos** | `cos(x: double) -> double` | 返回 `x` 的餘弦值（弧度）。 |
| **tan** | `tan(x: double) -> double` | 返回 `x` 的正切值（弧度）。 |
| **asin** | `asin(x: double) -> double` | 返回 `x` 的反正弦值。 |
| **acos** | `acos(x: double) -> double` | 返回 `x` 的反餘弦值。 |
| **atan** | `atan(x: double) -> double` | 返回 `x` 的反正切值。 |
| **atan2** | `atan2(y: double, x: double) -> double" | 返回 `y/x` 的反正切值。 |

### 捨入與餘數

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **ceil** | `ceil(x: double) -> double` | 無條件進位至最近的整數。 |
| **floor** | `floor(x: double) -> double` | 無條件捨去至最近的整數。 |
| **round** | `round(x: double) -> double` | 四捨五入至最近的整數。 |
| **mod** | `mod(x: double, y: double) -> double` | 計算 `x / y` 的浮點餘數。 |

### 最小值 / 最大值

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **max** | `max(a: double, b: double) -> double` | 返回兩個值中較大的一個。 |
| **min** | `min(a: double, b: double) -> double` | 返回兩個值中較小的一個。 |
