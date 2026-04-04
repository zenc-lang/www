+++
title = "std/vec"
+++

# std/vec

`Vec<T>` 是一個連續的、可增長的陣列類型。它是 Zen-C 中使用的標準動態陣列。

## 概覽

- **通用（Generic）**：適用於任何類型 `T`。
- **動態性**：隨著元素的添加自動調整大小。
- **安全**：存取時進行邊界檢查（失敗時發出恐慌）。
- **RAII**：超出作用域時自動釋放記憶體（實現了 `Drop` 介面）。

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
} // v 在此處自動釋放
```

## 結構體定義

```zc
struct Vec<T> {
    data: T*;
    len: usize;
    cap: usize;
}
```

## 方法

### 構造

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **new** | `Vec<T>::new() -> Vec<T>` | 建立一個新的空向量。在第一次執行 push 之前不會分配記憶體。 |
| **with_capacity** | `Vec<T>::with_capacity(cap: usize) -> Vec<T>` | 建立一個具有初始容量 `cap` 的新向量。如果您預先知道元素數量，這有利於優化。 |

### 修改

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **push** | `push(self, item: T)` | 在末尾追加一個元素。如果分配失敗則發出恐慌。 |
| **pop** | `pop(self) -> T` | 移除最後一個元素並返回它。如果為空則發出恐慌。 |
| **pop_opt** | `pop_opt(self) -> Option<T>` | 移除最後一個元素並返回 `Some(val)`。如果為空則返回 `None`。此為安全用法。 |
| **insert** | `insert(self, idx: usize, item: T)` | 在 `idx` 位置插入一個元素。將後面的元素右移。如果 `idx > len` 則發出恐慌。 |
| **remove** | `remove(self, idx: usize) -> T` | 移除並返回 `idx` 位置的元素。將後面的元素左移。如果 `idx >= len` 則發出恐慌。 |
| **append** | `append(self, other: Vec<T>)` | 將 `other` 中的所有元素追加到 `self` 中。會消耗 `other`（移動語義）。 |
| **clear** | `clear(self)` | 移除所有值。不影響已分配的容量。 |
| **reverse** | `reverse(self)` | 在原處反轉元素順序。 |

### 存取

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **get** | `get(self, idx: usize) -> T` | 返回 `idx` 處元素的拷貝。如果越界則發出恐慌。 |
| **get_ref** | `get_ref(self, idx: usize) -> T*` | 返回指向 `idx` 處元素的指標。如果越界則發出恐慌。用於避免拷貝。 |
| **set** | `set(self, idx: usize, item: T)` | 覆寫 `idx` 處的元素。如果越界則發出恐慌。 |
| **first** | `first(self) -> T` | 返回第一個元素的拷貝。如果為空則發出恐慌。 |
| **last** | `last(self) -> T` | 返回最後一個元素的拷貝。如果為空則發出恐慌。 |

### 工具方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **length** | `length(self) -> usize` | 返回元素數量。 |
| **is_empty** | `is_empty(self) -> bool` | 如果向量不包含元素則返回 `true`。 |
| **contains** | `contains(self, item: T) -> bool` | 如果向量包含等於 `item` 的元素（逐位元組比較），則返回 `true`。 |
| **clone** | `clone(self) -> Vec<T>` | 返回包含數據深拷貝的新向量。 |
| **eq** | `eq(self, other: Vec<T>*) -> bool` | 如果兩個向量逐位元組相等，則返回 `true`。接受指標以避免移動 `other`。 |

### 運算子

Zen-C 支援運算子重載。`Vec<T>` 實現了以下項目：

| 運算子 | 方法 | 說明 |
| :--- | :--- | :--- |
| `+` | **add** | `v1 + &v2`。返回一個新向量（連接結果）。 |
| `+=` | **add_assign** | `v1 += &v2`。將 `v2` 追加到 `v1`。 |
| `==` | **eq** | `v1 == &v2`。結構相等性檢查。 |
| `!=` | **neq** | `v1 != &v2`。結構不等性檢查。 |
| `<<` | **shl** | `v << item`。將 `item` 推入末尾。 |
| `>>` | **shr** | `v >> &item`。將最後一個元素彈出到 `item` 中。 |
| `*` | **mul** | `v * n`。返回一個將元素重複 `n` 次的新向量。 |
| `*=` | **mul_assign** | `v *= n`。在原處將元素重複 `n` 次。 |
| `[]` | **get** / **set** | `v[i]` 與 `v[i] = x`。標準索引存取。 |

### 迭代

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **iterator** | `iterator(self) -> VecIter<T>` | 返回產生拷貝值的迭代器。由 `for x in v` 使用。 |
| **iter_ref** | `iter_ref(self) -> VecIterRef<T>` | 返回產生指標的迭代器。由 `for x in &v`（語法糖）或 `for x in v.iter_ref()` 使用。允許原處修改。 |

## 記憶體管理

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **Free** | `free(self)` | 手動釋放記憶體。可多次安全呼叫。 |
| **Forget** | `forget(self)` | 將記憶體緩衝區與向量分離（將欄位設為 0）。防止 `Drop` 釋放記憶體。用於實現移動語義或轉移所有權。 |
| **Trait** | `impl Drop for Vec" | 超出作用域時自動調用 `free()`。 |
