+++
title = "std/complex"
+++

# std/complex

`std/complex` 庫提供了 `Complex` 結構體以及在 Zen-C 中處理複數所需的基本數學運算。

## 概覽

- **數值類型**：具有 `real`（實部）和 `imag`（虛部）組件的簡單結構體。
- **運算子支援**：透過運算子重載支援 `+`、`-`、`*`、`/`、`==` 和 `!=`。
- **屬性**：提供計算模數（magnitude）和相位（phase）的方法。
- **插值**：可直接用於 f-string 和 print 語句。

## 使用方法

```zc
import "std/complex.zc"

fn main() {
    let c1 = Complex::new(3.0, 4.0);
    let c2 = Complex::new(1.0, 2.0);
    
    let sum = c1 + c2;
    let prod = c1 * c2;
    
    println "總和: {sum}";       // 總和: 4.000000 + 6.000000i
    println "模數: {c1.magnitude()}";
}
```

## 結構體定義

```zc
struct Complex {
    real: double;
    imag: double;
}
```

## 方法

### 構造

| 方法 | 簽名 | 说明 |
| :--- | :--- | :--- |
| **new** | `Complex::new(r: double, i: double) -> Complex` | 建立具有實部 `r` 和虛部 `i` 的新複數。 |

### 訪問與查詢

| 方法 | 簽名 | 说明 |
| :--- | :--- | :--- |
| **magnitude** | `magnitude(self) -> double` | 返回複數的模數（絕對值）。 |
| **phase** | `phase(self) -> double` | 以弧度為單位返回相位（角度）。 |

## 運算子

| 運算子 | 方法 | 說明 |
| :--- | :--- | :--- |
| `+` | **add** | 將兩個複數相加。 |
| `-` | **sub** | 將一個複數減去另一個。 |
| `*` | **mul** | 將兩個複數相乘。 |
| `/` | **div** | 將一個複數除以另一個。 |
| `==` | **eq** | 檢查兩個複數是否嚴格相等。 |
| `!=` | **neq** | 檢查兩個複數是否不相等。 |
| `{}` | **to_string** | 啟用直接字串插值。 |
