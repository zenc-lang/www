+++
title = "std/queue"
+++

# std/queue

`Queue<T>` 是一個通用的先進先出（FIFO）佇列，實現為 **環形緩衝區（Circular Buffer / Ring Buffer）**。

## 使用方法

```zc
import "std/queue.zc"

fn main() {
    let q = Queue<int>::new();
    
    q.push(1);
    q.push(2);
    q.push(3);
    
    // Pop 返回一個 Option<T>
    if (q.pop().is_some()) {
        println "彈出內容: {q.pop().unwrap()}"; // 1
    }
}
```

## 實現細節

- **環形緩衝區**：使用帶有 `head`（頭）和 `tail`（尾）索引的環形緩衝區。
- **效能**：
    - `push`：**均攤 O(1)**（容量滿時重新調整大小）。
    - `pop`：**O(1)**（使頭索引前進）。
    - `clone`：**O(N)**。
- **安全**：對記憶體環繞和大小調整進行了安全處理。

## 結構體定義

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

### 構造

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **new** | `Queue<T>::new() -> Queue<T>` | 建立一個新的空佇列。 |
| **clone** | `clone(self) -> Queue<T>` | 建立佇列的深拷貝。 |

### 修改

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **push** | `push(self, value: T)` | 將元素添加到佇列末尾。 |
| **pop** | `pop(self) -> Option<T>` | 移除並返回最前面的元素。如果佇列為空則返回 `None`。 |
| **clear** | `clear(self)` | 從佇列中移除所有項目。 |

### 訪問與查詢

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **length** | `length(self) -> usize` | 返回項目的數量。 |
| **is_empty** | `is_empty(self) -> bool` | 如果佇列為空則返回 `true`。 |

## 記憶體管理

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **free** | `free(self)` | 釋放內部緩衝區。 |
| **Trait** | `impl Drop for Queue" | 超出作用域時自動調用 `free()`。 |
