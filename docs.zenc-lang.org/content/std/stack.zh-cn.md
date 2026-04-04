+++
title = "std/stack"
+++

# std/stack

`std/stack` 模块提供 LIFO（后进先出）栈数据结构。

## 使用方法

```zc
import "std/stack.zc"

fn main() {
    let s = Stack<int>::new();
    s.push(10);
    s.push(20);
    
    let top = s.pop(); // Some(20)
} // s 会在此处自动释放
```

## 结构体定义

```zc
struct Stack<T> {
    // 内部实现细节
}
```

## 方法

### 构造

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **new** | `Stack<T>::new() -> Stack<T>` | 创建一个空的新栈。 |
| **clone** | `clone(self) -> Stack<T>` | 创建栈的一个深拷贝。 |

### 修改

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **push** | `push(self, value: T)` | 将一个值压入栈顶。 |
| **pop** | `pop(self) -> Option<T>` | 移除并返回栈顶元素。如果栈为空则返回 `None`。 |
| **clear** | `clear(self)` | 移除栈中的所有元素。 |

### 访问与查询

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **length** | `length(self) -> usize` | 返回栈中的元素数量。 |
| **is_empty** | `is_empty(self) -> bool" | 如果栈不包含元素，则返回 `true`。 |

## 内存管理

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **free** | `free(self)` | 手动释放栈内存。 |
| **Trait** | `impl Drop for Stack` | 当栈超出作用域时自动调用 `free()`。 |
