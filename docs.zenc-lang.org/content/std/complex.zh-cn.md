+++
title = "std/complex"
+++

# std/complex

`std/complex` 库提供了 `Complex` 结构体和在 Zen-C 中处理复数所需的基本数学运算。

## 概览

- **数值类型**：具有 `real`（实部）和 `imag`（虚部）组件的简单结构体。
- **运算符支持**：通过运算符重载支持 `+`、`-`、`*`、`/`、`==` 和 `!=`。
- **属性**：提供计算模长（magnitude）和相位（phase）的方法。
- **插值**：可以直接在格式化字符串（f-strings）和打印语句中使用。

## 使用方法

```zc
import "std/complex.zc"

fn main() {
    let c1 = Complex::new(3.0, 4.0);
    let c2 = Complex::new(1.0, 2.0);
    
    let sum = c1 + c2;
    let prod = c1 * c2;
    
    println "和: {sum}";       // 和: 4.000000 + 6.000000i
    println "模长: {c1.magnitude()}";
}
```

## 结构体定义

```zc
struct Complex {
    real: double;
    imag: double;
}
```

## 方法

### 构造

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **new** | `Complex::new(r: double, i: double) -> Complex` | 创建一个实部组件为 `r`、虚部组件为 `i` 的新复数。 |

### 查询与访问

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **magnitude** | `magnitude(self) -> double` | 返回复数的模长（绝对值）。 |
| **phase** | `phase(self) -> double` | 返回以弧度表示的相位（角度）。 |

## 运算符

| 运算符 | 方法 | 说明 |
| :--- | :--- | :--- |
| `+` | **add** | 两个复数相加。 |
| `-` | **sub** | 一个复数减去另一个复数。 |
| `*` | **mul** | 两个复数相乘。 |
| `/` | **div** | 一个复数除以另一个复数。 |
| `==` | **eq** | 检查两个复数是否严格相等。 |
| `!=` | **neq** | 检查两个复数是否不相等。 |
| `{}" | **to_string** | 实现直接字符串插值。 |
