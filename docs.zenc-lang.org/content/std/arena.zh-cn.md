+++
title = "std/arena"
+++

# std/arena

`std/arena` 模块提供了一个快速的“线性”分配器（bump allocator），用于批量内存分配。在 arena 中分配的所有内存，在 arena 本身被销毁或重置时，会一次性全部释放。

## 概览

- **性能**：分配速度极快，仅涉及单个指针递增。
- **批量释放**：由于所有内存都可以同时释放，非常适合任务局部或请求局部的分配。
- **保存/恢复**：支持“检查点”功能，可以部分释放 arena 内的内存。
- **RAII**：实现了 `Drop` trait，确保底层缓冲区自动释放。

## 使用方法

```zc
import "std/arena.zc"

struct Node {
    val: int;
}

fn main() {
    // 创建一个容量为 1KB 的 arena
    let a = Arena::new(1024);
    
    // 快速分配
    let n1 = a.alloc<Node>();
    let n2 = a.alloc<Node>();
    
    // 将字符串复制到 arena 内存中
    let s = a.dup_str("Hello World");
    
    println "Arena 已使用: {a.bytes_used()} 字节";
    
    // 当 'a' 超出作用域时，所有内存都会自动释放
}
```

## 结构体定义

```zc
struct Arena {
    data: void*;
    capacity: usize;
    used: usize;
}
```

## 方法

### 构造

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **new** | `Arena::new(cap: usize) -> Arena` | 创建一个具有指定容量的新 arena。 |

### 分配

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **alloc\<T>** | `alloc<T>(self) -> T*` | 为类型 `T` 分配并零初始化内存。 |
| **alloc_n\<T>**| `alloc_n<T>(self, count: usize) -> T*` | 为类型为 `T` 的 `count` 个元素分配数组内存。 |
| **alloc_bytes**| `alloc_bytes(self, size: usize) -> void*` | 原始字节分配（按 8 字节对齐）。 |
| **dup_str** | `dup_str(self, src: char*) -> char*` | 将 C 字符串复制到 arena 中。 |

### 查询与控制

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **bytes_used** | `bytes_used(self) -> usize` | 返回当前已分配的总字节数。 |
| **bytes_free** | `bytes_free(self) -> usize` | 返回剩余容量。 |
| **save** | `save(self) -> usize` | 返回代表当前使用情况的“检查点”。 |
| **restore** | `restore(self, mark: usize)` | 部分释放回之前的检查点。 |
| **reset** | `reset(self)` | 通过将使用量重置为零来释放所有分配（保留缓冲区）。 |

## 内存管理

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **free** | `free(self)` | 显式释放底层的 arena 缓冲区。 |
| **Trait** | `impl Drop for Arena` | 当 arena 超出作用域时自动调用 `free()`。 |
