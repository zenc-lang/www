+++
title = "std/bigint"
+++

# std/bigint

`BigInt` 为 Zen-C 提供任意精度的整数运算。它允许进行超过标准数值类型（如 `u64`）容量的整数计算。

## 概览

- **任意精度**：数值大小仅受可用内存限制。
- **十进制基础**：目前为了简单起见，使用简单的 10 进制表示。
- **RAII**：实现了 `Drop` trait，用于自动管理内部数字存储的内存。
- **便捷性**：支持运算符重载，提供直观的算术运算。

## 使用方法

```zc
import "std/bigint.zc"

fn main() {
    let a = BigInt::from_int(1_000_000_000_000_000);
    let b = BigInt::from_int(2_000_000_000_000_000);
    
    // 使用运算符重载
    let sum = a + b; 
    
    let s = sum.to_string();
    println "和: {s}";
    free(s);
} // sum, a, 以及 b 在此处会自动释放
```

## 结构体定义

```zc
struct BigInt {
    digits: Vec<u8>*;
}
```

## 方法

### 构造

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **new** | `BigInt::new() -> BigInt` | 创建一个新的 `BigInt`，初始化为 0。 |
| **from_int** | `BigInt::from_int(val: u64) -> BigInt` | 从 64 位整数创建一个新的 `BigInt`。 |

### 修改

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **add_in_place** | `add_in_place(self, other: BigInt)` | 通过修改内部状态，将 `other` 加到 `self` 中。 |

### 实用工具

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **clone** | `clone(self) -> BigInt` | 返回 `BigInt` 的深拷贝。 |
| **to_string** | `to_string(self) -> char*` | 返回堆分配的字符串表示。 |

## 运算符

| 运算符 | 方法 | 说明 |
| :--- | :--- | :--- |
| `+` | **add** | 返回一个包含两个值之和的新 `BigInt`。 |
| `{}" | **to_string** | 自动实现在格式化字符串中的插值。 |

## 内存管理

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **free_mem** | `free_mem(self)` | 手动释放底层的 `Vec` 和 `BigInt` 存储空间。 |
| **Trait** | `impl Drop for BigInt` | 当超出作用域时自动调用 `free_mem()`。 |
