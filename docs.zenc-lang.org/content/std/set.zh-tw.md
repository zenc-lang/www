+++
title = "std/set"
+++

# std/set

`Set<T>` 是一個通用的哈希集合（hash set）實現，用於儲存類型為 `T` 的唯一值。它使用了帶有線性探測（linear probing）的開方位址（open-addressing）哈希表。

## 概覽

- **通用（Generic）**：儲存任何類型 `T`。
- **唯一性**：自動處理重複項；添加現有元素會返回 `false`。
- **高效力**：添加、移除和尋找的平均時間複雜度為 O(1)。
- **RAII**：實現了 `Drop` trait，以進行自動記憶體管理。

## 使用方法

```zc
import "std/set.zc"

fn main() {
    let s = Set<int>::new();
    
    s.add(10);
    s.add(20);
    s.add(10); // 重複項，返回 false
    
    if (s.contains(10)) {
        println "集合包含 10";
    }
    
    s.remove(20);
    println "長度: {s.length()}";
} // s 在此處自動釋放
```

## 結構體定義

```zc
struct Set<T> {
    data: T*;
    len: usize;
    cap: usize;
    // ... 內部欄位
}
```

## 方法

### 構造

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **new** | `Set<T>::new() -> Set<T>` | 建立一個新的空集合。 |

### 修改

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **add** | `add(self, val: T) -> bool` | 向集合添加一個值。如果添加成功返回 `true`，如果值已存在則返回 `false`。 |
| **remove** | `remove(self, val: T) -> bool` | 從集合中移除一個值。如果值存在且被成功移除，則返回 `true`。 |
| **clear** | `clear(self)` | 從集合中移除所有元素，但不釋放已分配的記憶體。 |

### 存取與查詢

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **contains** | `contains(self, val: T) -> bool` | 如果值存在於集合中，則返回 `true`。 |
| **length** | `length(self) -> usize` | 返回唯一元素的數量。 |
| **is_empty** | `is_empty(self) -> bool` | 如果集合中沒有元素，則返回 `true`。 |
| **capacity** | `capacity(self) -> usize` | 返回目前的內部容量。 |

### 工具方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **is_slot_occupied** | `is_slot_occupied(self, idx: usize) -> bool` | 檢查特定的內部哈希插槽是否已被占用。 |
| **val_at** | `val_at(self, idx: usize) -> Option<T>` | 返回特定內部插槽處的值（如果有的話）。 |

## 記憶體管理

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **free** | `free(self)` | 手動釋放集合的內部緩衝區。 |
| **Trait** | `impl Drop for Set" | 當集合超出作用域時自動調用 `free()`。 |
