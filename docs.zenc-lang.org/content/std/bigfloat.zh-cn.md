+++
title = "std/bigfloat"
+++

# std/bigfloat

`BigFloat` 为 Zen-C 提供任意精度的十进制浮点运算。它实现为缩放后的 `BigInt`，允许进行高精度计算而不会出现二进制舍入误差。

## 概览

- **任意精度**：支持任何大小的十进制数，仅受内存限制。
- **缩放表示**：使用 `BigInt` 数值和整数 `scale`（比例）来表示十进制值。
- **精度控制**：轻松对齐比例，实现精确的加法和减法。
- **RAII**：底层数值的内存通过 `Drop` trait 自动管理。

## 使用方法

```zc
import "std/bigfloat.zc"

fn main() {
    let a = BigFloat::from_int(123);
    a.scale = 2; // 表示 1.23
    
    let b = BigFloat::from_int(4567);
    b.scale = 3; // 表示 4.567
    
    let sum = a.add(b);
    
    let s = sum.to_string();
    println "和: {s}"; // 和: 5.797
    free(s);
} // a, b, 以及 sum 在此处会自动释放
```

## 结构体定义

```zc
struct BigFloat {
    magnitude: BigInt;
    scale: int;
}
```

## 方法

### 构造

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **new** | `BigFloat::new() -> BigFloat` | 创建一个新的 `BigFloat`，初始化为 0.0。 |
| **from_int** | `BigFloat::from_int(val: u64) -> BigFloat` | 从整数创建一个比例为 0 的 `BigFloat`。 |

### 修改

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **add** | `add(self, other: BigFloat) -> BigFloat" | 将两个 `BigFloat` 值相加，并自动对齐它们的比例。返回一个新的 `BigFloat`。 |
| **align_scale** | `align_scale(self, target_scale: int)` | 通过平移数值，将 `BigFloat` 的比例增加到 `target_scale`。 |

### 实用工具

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **clone** | `clone(self) -> BigFloat` | 返回 `BigFloat` 的深拷贝。 |
| **to_string** | `to_string(self) -> char*` | 返回堆分配的字符串表示（包含小数点）。 |

## 内存管理

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **free_mem** | `free_mem(self)` | 手动释放底层的 `BigInt` 内存。 |
| **Trait** | `impl Drop for BigFloat` | 当超出作用域时自动调用 `free_mem()`。 |
