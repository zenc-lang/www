+++
title = "std/stack"
+++

# std/stack

`std/stack` 模組提供了一個 LIFO（後進先出）堆疊數據結構。

## 使用方法

```zc
import "std/stack.zc"

fn main() {
    let s = Stack<int>::new();
    s.push(10);
    s.push(20);
    
    let top = s.pop(); // Some(20)
} // s 在此處自動釋放
```

## 結構體定義

```zc
struct Stack<T> {
    // 內部實現細節
}
```

## 方法

### 構造

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **new** | `Stack<T>::new() -> Stack<T>` | 建立一個新的空堆疊。 |
| **clone** | `clone(self) -> Stack<T>` | 建立堆疊的深拷貝。 |

### 修改

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **push** | `push(self, value: T)` | 將一個值推入堆疊頂部。 |
| **pop** | `pop(self) -> Option<T>` | 移除並返回堆疊頂部元素。如果堆疊為空則返回 `None`。 |
| **clear** | `clear(self)` | 從堆疊中移除所有元素。 |

### 存取與查詢

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **length** | `length(self) -> usize` | 返回堆疊中的元素數量。 |
| **is_empty** | `is_empty(self) -> bool` | 如果堆疊不包含元素則返回 `true`。 |

## 記憶體管理

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **free** | `free(self)` | 手動釋放堆疊記憶體。 |
| **Trait** | `impl Drop for Stack" | 當堆疊超出作用域時自動調用 `free()`。 |
