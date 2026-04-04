+++
title = "std/queue"
+++

# std/queue

`Queue<T>` 是一个通用的先进先出 (FIFO) 队列，实现为 **环形缓冲区 (Ring Buffer / Circular Buffer)**。

## 使用方法

```zc
import "std/queue.zc"

fn main() {
    let q = Queue<int>::new();
    
    q.push(1);
    q.push(2);
    q.push(3);
    
    // Pop 返回一个 Option<T>
    if (q.pop().is_some()) {
        println "弹出值: {q.pop().unwrap()}"; // 1
    }
}
```

## 实现细节

- **环形缓冲区**：使用带有 `head`（头）和 `tail`（尾）索引的循环缓冲区。
- **性能**：
    - `push`：**摊销 O(1)**（满时会调整大小）。
    - `pop`：**O(1)**（推进头索引）。
    - `clone`：**O(N)**。
- **安全性**：安全处理内存环绕和大小调整。

## 结构体定义

```zc
struct Queue<T> {
    data: T*;
    cap: usize;
    head: usize;
    tail: usize;
    count: usize;
}
```

## 方法

### 构造

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **new** | `Queue<T>::new() -> Queue<T>` | 创建一个空的新队列。 |
| **clone** | `clone(self) -> Queue<T>` | 返回队列的一个深拷贝。 |

### 修改

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **push** | `push(self, value: T)` | 在队列末尾添加一个元素。 |
| **pop** | `pop(self) -> Option<T>` | 移除并返回前端的元素。如果队列为空则返回 `None`。 |
| **clear** | `clear(self)` | 移除队列中的所有项。 |

### 访问与查询

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **length** | `length(self) -> usize` | 返回项的数量。 |
| **is_empty** | `is_empty(self) -> bool` | 如果队列为空则返回 `true`。 |

## 内存管理

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **free** | `free(self)` | 释放内部缓冲区。 |
| **Trait** | `impl Drop for Queue" | 当超出作用域时自动调用 `free()`。 |
