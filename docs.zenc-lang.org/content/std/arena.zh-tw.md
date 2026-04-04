+++
title = "std/arena"
+++

# std/arena

`std/arena` 模組提供了一個快速的 "bump" 分配器，用於大量記憶體分配。當 arena 本身被銷毀或重置時，在 arena 內分配的所有記憶體都會被一次性釋放。

## 概覽

- **效能**：分配速度極快，僅涉及單個指標遞增。
- **批量釋放**：非常適合任務局部（task-local）或請求局部（request-local）的分配，因為所有內容都可以同時釋放。
- **保存/還原**：支援「檢查點」（checkpoints），可部分釋放 arena 內的記憶體。
- **RAII**：實現了 `Drop` trait，確保底層緩衝區會自動釋放。

## 使用方法

```zc
import "std/arena.zc"

struct Node {
    val: int;
}

fn main() {
    // 建立具有 1KB 容量的 arena
    let a = Arena::new(1024);
    
    // 快速分配
    let n1 = a.alloc<Node>();
    let n2 = a.alloc<Node>();
    
    // 將字串複製到 arena 記憶體中
    let s = a.dup_str("Hello World");
    
    println "Arena 已使用: {a.bytes_used()} 位元組";
    
    // 當 'a' 超出作用域時，所有內容都會自動釋放
}
```

## 結構體定義

```zc
struct Arena {
    data: void*;
    capacity: usize;
    used: usize;
}
```

## 方法

### 構造

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **new** | `Arena::new(cap: usize) -> Arena` | 建立一個具有指定容量的新 arena。 |

### 分配

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **alloc\<T>** | `alloc<T>(self) -> T*` | 為類型 `T` 分配並初始化為零的記憶體。 |
| **alloc_n\<T>**| `alloc_n<T>(self, count: usize) -> T*` | 為類型 `T` 的 `count` 個元素陣列分配記憶體。 |
| **alloc_bytes**| `alloc_bytes(self, size: usize) -> void*` | 原始位元組分配（對齊到 8 位元組）。 |
| **dup_str** | `dup_str(self, src: char*) -> char*` | 將 C 字串複製到 arena 中。 |

### 查詢与控制

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **bytes_used** | `bytes_used(self) -> usize` | 返回目前已分配的總位元組數。 |
| **bytes_free** | `bytes_free(self) -> usize` | 返回剩餘容量。 |
| **save** | `save(self) -> usize` | 返回代表目前使用情況的「檢查點」。 |
| **restore** | `restore(self, mark: usize)` | 部分釋放回到之前的檢查點。 |
| **reset** | `reset(self)` | 通過將使用量重設為零來釋放所有分配（保留緩衝區）。 |

## 記憶體管理

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **free** | `free(self)` | 顯式釋放底層 arena 緩衝區。 |
| **Trait** | `impl Drop for Arena` | 當 arena 超出作用域時自動調用 `free()`。 |
