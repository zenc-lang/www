+++
title = "std/map"
+++

# std/map

`Map<V>` 是一个通用的哈希映射实现，将字符串键映射到类型为 `V` 的值。

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
} // 'm' 在此处会自动释放
```

## 结构体定义

```zc
struct Map<V> {
    keys: char**;
    vals: V*;
    // ... 内部字段
}
```

## 方法

### 构造

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **new** | `Map<V>::new() -> Map<V>` | 创建一个空的新映射。 |

### 迭代

您可以使用 `for` 循环遍历映射的键值对。

```zc
let m = Map<int>::new();
m.put("a", 1);

for entry in m {
    println "键: {entry.key}, 值: {entry.val}";
}
```

迭代器会返回一个 `MapEntry<V>` 结构体：
```zc
struct MapEntry<V> {
    key: char*;
    val: V;
}
```

### 修改

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **put** | `put(self, key: char*, val: V)` | 插入或更新键值对。 |
| **remove** | `remove(self, key: char*)` | 从映射中移除一个键及其对应的值。 |

### 访问与查询

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **get** | `get(self, key: char*) -> Option<V>` | 检索与键关联的值。 |
| **contains** | `contains(self, key: char*) -> bool` | 如果键存在，则返回 true。 |
| **length** | `length(self) -> usize` | 返回映射中的条目数。 |
| **is_empty** | `is_empty(self) -> bool` | 如果映射为空，则返回 true。 |
| **capacity** | `capacity(self) -> usize` | 返回映射的当前容量。 |

### 迭代辅助方法

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **is_slot_occupied** | `is_slot_occupied(self, idx: usize) -> bool` | 检查原始插槽索引是否已被占用。 |
| **key_at** | `key_at(self, idx: usize) -> char*` | 获取原始插槽索引处的键。 |
| **val_at** | `val_at(self, idx: usize) -> V` | 获取原始插槽索引处的值。 |

## 内存管理

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **free** | `free(self)` | 释放映射的内部存储空间。**注意**：如果值是指针/对象，该方法不会释放这些值。 |
| **Trait** | `impl Drop for Map" | 当超出作用域时自动调用 `free()`。 |
