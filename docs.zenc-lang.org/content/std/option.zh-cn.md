+++
title = "std/option"
+++

# std/option

`Option<T>` 表示一个可选值：每个 `Option` 要么是 `Some`（包含一个值），要么是 `None`。它通常用于在不使用空指针的情况下处理缺失值。

## 概览

- **安全性**：鼓励显式处理 `None` 的情况。
- **泛型**：可以封装任何类型 `T`。
- **零成本**：编译为一个带有布尔标志的简单结构体。
- **便捷性**：提供了许多用于解包（unwrapping）和转换值的工具方法。

## 使用方法

```zc
import "std/option.zc"

fn main() {
    let val = Option<int>::Some(10);
    
    if (val.is_some()) {
        println "值为 {val.unwrap()}";
    }
    
    let empty = Option<int>::None();
    let x = empty.unwrap_or(0);
}
```

## 结构体定义

```zc
struct Option<T> {
    is_some: bool;
    val: T;
}
```

## 方法

### 构造

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **Some** | `Option<T>::Some(v: T) -> Option<T>` | 创建一个包含 `v` 的 `Some` 选项。 |
| **None** | `Option<T>::None() -> Option<T>` | 创建一个 `None` 选项。 |

### 查询

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **is_some** | `is_some(self) -> bool` | 如果选项为 `Some`，则返回 `true`。 |
| **is_none** | `is_none(self) -> bool` | 如果选项为 `None`，则返回 `true`。 |

### 提取

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **unwrap** | `unwrap(self) -> T` | 返回所包含的值。如果为 `None` 则触发恐慌。 |
| **unwrap_ref** | `unwrap_ref(self) -> T*` | 返回指向所包含值的指针。如果为 `None` 则触发恐慌。 |
| **unwrap_or** | `unwrap_or(self, def: T) -> T` | 返回所包含的值或默认值 `def`。 |
| **expect** | `expect(self, msg: char*) -> T` | 返回值，如果为 `None` 则打印 `msg` 并触发恐慌。 |
| **or_else** | `or_else(self, other: Option<T>) -> Option<T>` | 如果为 `Some` 则返回自身，否则返回 `other`。 |

## 内存管理

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **forget** | `forget(self)` | 在不调用析构函数或释放内存的情况将内部值清零。 |
