+++
title = "std/vec"
+++

# std/vec

`Vec<T>` 是一种连续的、可增长的数组类型。它是 Zen-C 中使用的标准动态数组。

## 概览

- **泛型**：支持任何类型 `T`。
- **动态**：随着元素的添加自动调整大小。
- **安全**：访问时进行边界检查（失败时触发恐慌）。
- **RAII**：超出作用域时自动释放内存（实现了 `Drop`）。

## 使用方法

```zc
import "std/vec.zc"

fn main() {
    let v = Vec<int>::new();
    v.push(10);
    v.push(20);
    
    // 迭代
    for x in &v {
        println "{(*x)}";
    }
} // v 在此处自动释放
```

## 结构体定义

```zc
struct Vec<T> {
    data: T*;
    len: usize;
    cap: usize;
}
```

## 方法

### 构造

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **new** | `Vec<T>::new() -> Vec<T>` | 创建一个新的空向量。在第一次 push 之前不会分配内存。 |
| **with_capacity** | `Vec<T>::with_capacity(cap: usize) -> Vec<T>` | 创建一个具有初始容量 `cap` 的新向量。如果预先知道元素数量，这对性能优化很有用。 |

### 修改

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **push** | `push(self, item: T)` | 在末尾追加一个元素。如果分配失败则触发恐慌。 |
| **pop** | `pop(self) -> T` | 移除最后一个元素并返回它。如果为空则触发恐慌。 |
| **pop_opt** | `pop_opt(self) -> Option<T>` | 移除最后一个元素并返回 `Some(val)`。如果为空则返回 `None`。安全用法。 |
| **insert** | `insert(self, idx: usize, item: T)` | 在 `idx` 处插入一个元素。将后面的元素向右移动。如果 `idx > len` 则触发恐慌。 |
| **remove** | `remove(self, idx: usize) -> T` | 移除并返回 `idx` 处的元素。将后面的元素向左移动。如果 `idx >= len` 则触发恐慌。 |
| **append** | `append(self, other: Vec<T>)` | 将 `other` 中的所有元素追加到 `self` 中。消耗 `other`（移动语义）。 |
| **clear** | `clear(self)` | 移除所有值。对已分配的容量没有影响。 |
| **reverse** | `reverse(self)` | 原位反转元素的顺序。 |

### 访问

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **get** | `get(self, idx: usize) -> T` | 返回 `idx` 处元素的副本。如果越界则触发恐慌。 |
| **get_ref** | `get_ref(self, idx: usize) -> T*` | 返回指向 `idx` 处元素的指针。如果越界则触发恐慌。对于避免拷贝很有用。 |
| **set** | `set(self, idx: usize, item: T)` | 覆盖 `idx` 处的元素。如果越界则触发恐慌。 |
| **first** | `first(self) -> T` | 返回第一个元素的副本。如果为空则触发恐慌。 |
| **last** | `last(self) -> T` | 返回最后一个元素的副本。如果为空则触发恐慌。 |

### 工具方法

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **length** | `length(self) -> usize` | 返回元素数量。 |
| **is_empty** | `is_empty(self) -> bool` | 如果向量不包含元素，则返回 `true`。 |
| **contains** | `contains(self, item: T) -> bool` | 如果向量包含与 `item` 相等的元素（按字节比较），则返回 `true`。 |
| **clone** | `clone(self) -> Vec<T>` | 返回包含数据深拷贝的新向量。 |
| **eq** | `eq(self, other: Vec<T>*) -> bool" | 如果两个向量按字节相等，则返回 `true`。接受指针参数以避免移动 `other`。 |

### 运算符

Zen-C 支持运算符重载。`Vec<T>` 实现了以下运算符：

| 运算符 | 方法 | 说明 |
| :--- | :--- | :--- |
| `+` | **add** | `v1 + &v2`。返回一个新向量（连接操作）。 |
| `+=` | **add_assign** | `v1 += &v2`。将 `v2` 追加到 `v1` 中。 |
| `==` | **eq** | `v1 == &v2`。结构相等性检查。 |
| `!=` | **neq** | `v1 != &v2`。结构不等性检查。 |
| `<<` | **shl** | `v << item`。将 `item` 推入末尾。 |
| `>>` | **shr** | `v >> &item`。弹出最后一个元素到 `item` 中。 |
| `*` | **mul** | `v * n`。返回一个元素重复 `n` 次的新向量。 |
| `*=` | **mul_assign** | `v *= n`。原位将元素重复 `n` 次。 |
| `[]` | **get** / **set** | `v[i]` 和 `v[i] = x`。标准索引访问。 |

### 迭代

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **iterator** | `iterator(self) -> VecIter<T>` | 返回返回副本的迭代器。被 `for x in v` 使用。 |
| **iter_ref** | `iter_ref(self) -> VecIterRef<T>` | 返回返回指针的迭代器。被 `for x in &v`（语法糖）或 `for x in v.iter_ref()` 使用。允许原位修改。 |

## 内存管理

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **Free** | `free(self)` | 手动释放内存。可以安全地多次调用。 |
| **Forget** | `forget(self)` | 将内存缓冲区从向量中分离（将字段设为 0）。防止 `Drop` 释放内存。对于实现移动语义或转移所有权很有用。 |
| **Trait** | `impl Drop for Vec" | 当 `Vec` 超出作用域时自动调用 `free()`。 |
