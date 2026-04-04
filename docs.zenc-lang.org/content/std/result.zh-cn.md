+++
title = "std/result"
+++

# std/result

`Result<T>` 是 Zen-C 中用于错误处理的标准类型。它表示成功 (`Ok`) 并包含类型为 `T` 的值，或者失败 (`Err`) 并包含字符串形式的错误消息。

## 概览

- **安全性**：强制显式处理成功和失败路径。
- **信息丰富**：`Err` 情况携带描述性的错误消息。
- **泛型**：支持任何成功值类型 `T`。
- **集成化**：与基于 `Result` 的宏和模式无缝工作，实现简洁的错误传播。

## 使用方法

```zc
import "std/result.zc"

fn divide(a: int, b: int) -> Result<int> {
    if (b == 0) {
        return Result<int>::Err("除以零");
    }
    return Result<int>::Ok(a / b);
}

fn main() {
    match divide(10, 0) {
        Ok(val) => println "结果: {val}",
        Err(e)  => println "错误: {e}"
    }
}
```

## 结构体定义

```zc
struct Result<T> {
    is_ok: bool;
    val: T;
    err: char*;
}
```

## 方法

### 构造

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **Ok** | `Result<T>::Ok(v: T) -> Result<T>` | 创建一个包含 `v` 的成功结果。 |
| **Err** | `Result<T>::Err(e: char*) -> Result<T>` | 创建一个带有错误消息 `e` 的错误结果。 |

### 查询

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **is_ok** | `is_ok(self) -> bool` | 如果结果为 `Ok`，则返回 `true`。 |
| **is_err** | `is_err(self) -> bool` | 如果结果为 `Err`，则返回 `true`。 |

### 提取

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **unwrap** | `unwrap(self) -> T` | 返回成功值。如果是 `Err`，则使用其错误消息触发恐慌。 |
| **unwrap_ref** | `unwrap_ref(self) -> T*` | 返回指向成功值的指针。如果是 `Err` 则触发恐慌。 |
| **expect** | `expect(self, msg: char*) -> T" | 返回成功值，如果是 `Err` 则打印 `msg` 及其错误消息并触发恐慌。 |

## 内存管理

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **forget** | `forget(self)` | 在不调用析构函数或释放内存的情况下将成功值清零。 |
