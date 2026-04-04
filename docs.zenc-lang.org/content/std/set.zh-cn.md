+++
title = "std/set"
+++

# std/set

`Set<T>` 是一个通用的哈希集合实现，用于存储类型为 `T` 的唯一值。它使用采用线性探测的开放地址法哈希表。

## 概览

- **泛型**：存储任何类型 `T`。
- **唯一性**：自动处理重复值；添加已存在的元素会返回 `false`。
- **快速**：添加、移除和查找的平均时间复杂度为 O(1)。
- **RAII**：实现了 `Drop` trait，用于自动内存管理。

## 使用方法

```zc
import "std/set.zc"

fn main() {
    let s = Set<int>::new();
    
    s.add(10);
    s.add(20);
    s.add(10); // 重复，返回 false
    
    if (s.contains(10)) {
        println "集合中包含 10";
    }
    
    s.remove(20);
    println "长度: {s.length()}";
} // s 会在此处自动释放
```

## 结构体定义

```zc
struct Set<T> {
    data: T*;
    len: usize;
    cap: usize;
    // ... 内部字段
}
```

## 方法

### 构造

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **new** | `Set<T>::new() -> Set<T>` | 创建一个空的新集合。 |

### 修改

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **add** | `add(self, val: T) -> bool` | 向集合中添加一个值。如果添加成功则返回 `true`，如果值已存在则返回 `false`。 |
| **remove** | `remove(self, val: T) -> bool` | 从集合中移除一个值。如果值存在且被成功移除则返回 `true`。 |
| **clear** | `clear(self)` | 移除集合中的所有元素，但不释放已分配的内存。 |

### 访问与查询

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **contains** | `contains(self, val: T) -> bool` | 如果集合中存在该值，则返回 `true`。 |
| **length** | `length(self) -> usize` | 返回唯一元素的数量。 |
| **is_empty** | `is_empty(self) -> bool` | 如果集合没有元素，则返回 `true`。 |
| **capacity** | `capacity(self) -> usize" | 返回当前的内部容量。 |

### 工具方法

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **is_slot_occupied** | `is_slot_occupied(self, idx: usize) -> bool` | 检查特定的内部哈希插槽是否已被占用。 |
| **val_at** | `val_at(self, idx: usize) -> Option<T>` | 返回特定内部插槽中的值（如果有的话）。 |

## 内存管理

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **free** | `free(self)` | 手动释放集合的内部缓冲区。 |
| **Trait** | `impl Drop for Set` | 当集合超出作用域时自动调用 `free()`。 |
