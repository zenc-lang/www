+++
title = "std/map"
+++

# std/map

`Map<V>` 是一個通用的雜湊映射（hash map）實現，將字串鍵（keys）映射到類型為 `V` 的值。

## 使用方法

```zc
import "std/map.zc"

fn main() {
    let m = Map<int>::new();
    
    m.put("one", 1);
    m.put("two", 2);
    
    if (m.contains("one")) {
        let val = m.get("one");
        println "{val.unwrap()}";
    }
    
    m.remove("two");
} // m 在此處自動釋放
```

## 結構體定義

```zc
struct Map<V> {
    keys: char**;
    vals: V*;
    // ... 內部欄位
}
```

## 方法

### 構造

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **new** | `Map<V>::new() -> Map<V>` | 建立一個新的空映射。 |

### 迭代

您可以使用 `for` 迴圈迭代映射的鍵值對。

```zc
let m = Map<int>::new();
m.put("a", 1);

for entry in m {
    println "鍵: {entry.key}, 值: {entry.val}";
}
```

迭代器會產生一個 `MapEntry<V>` 結構體：
```zc
struct MapEntry<V> {
    key: char*;
    val: V;
}
```

### 修改

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **put** | `put(self, key: char*, val: V)` | 插入或更新鍵值對。 |
| **remove** | `remove(self, key: char*)` | 從映射中移除鍵及其對應的值。 |

### 訪問與查詢

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **get** | `get(self, key: char*) -> Option<V>` | 檢索與鍵關聯的值。 |
| **contains** | `contains(self, key: char*) -> bool` | 如果鍵存在則返回 true。 |
| **length** | `length(self) -> usize` | 返回映射中項目的數量。 |
| **is_empty** | `is_empty(self) -> bool` | 如果映射為空則返回 true。 |
| **capacity** | `capacity(self) -> usize` | 返回映射目前的容量。 |

### 迭代輔助方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **is_slot_occupied** | `is_slot_occupied(self, idx: usize) -> bool` | 檢查原始插槽索引是否已被占用。 |
| **key_at** | `key_at(self, idx: usize) -> char*` | 獲取原始插槽索引處的鍵。 |
| **val_at** | `val_at(self, idx: usize) -> V` | 獲取原始插槽索引處的值。 |

## 記憶體管理

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **free** | `free(self)` | 釋放映射的內部儲存空間。**注意**：如果值是指標/物件，此操作不會釋放它們。 |
| **Trait** | `impl Drop for Map" | 出作用域時自動調用 `free()`。 |
