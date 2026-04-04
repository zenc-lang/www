+++
title = "std/mem"
+++

# std/mem

`std/mem` 模組提供了核心記憶體管理工具，包括手動分配函數、標準生命週期特性（traits）以及智慧型指標實現。

## 概覽

- **手動分配**：對 `malloc`、`calloc` 和 `free` 的封裝，具有類型安全的簽名。
- **特性 (Traits)**：定義了主要的生命週期特性：`Drop`（析構函數）、`Clone`（深拷貝）和 `Copy`（隱式拷貝）。
- **智慧型指標**：包含 `Box<T>`，用於具有自動清理功能的堆分配數據 (RAII)。
- **緩衝區工具**：用於交換（swapping）、清零和拷貝記憶體的高階函數。

## 使用方法

```zc
import "std/mem.zc"

fn main() {
    // 手動分配
    let ptr = alloc<int>();
    *ptr = 42;
    free(ptr);
    
    // 使用 Box 自動清理 (RAII)
    {
        let b = Box<int>::new();
        *b.get() = 100;
        // 記憶體在此處自動釋放
    }
}
```

## 方法

### 分配

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **alloc\<T>**| `alloc<T>() -> T*` | 為單個 `T` 實例分配記憶體。 |
| **zalloc\<T>**| `zalloc<T>() -> T*` | 為單個 `T` 實例分配初始化為零的記憶體。 |
| **alloc_n\<T>**| `alloc_n<T>(n: usize) -> T*` | 為 `n` 個 `T` 實例的陣列分配記憶體。 |

### 操作

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **mem_zero\<T>**| `mem_zero<T>(ptr: T*, count: usize)` | 將 `count` 個 `T` 實例的記憶體設為零。 |
| **mem_copy\<T>**| `mem_copy<T>(dst: T*, src: T*, count: usize)`| 將 `count` 個 `T` 實例從 `src` 拷貝到 `dst`。 |
| **swap\<T>** | `swap<T>(a: T*, b: T*)` | 交換兩個記憶體位置之間的值。 |

## 特性 (Traits)

| 特性 | 方法 | 簽名 | 說明 |
| :--- | :--- | :--- | :--- |
| **Drop** | **drop** | `drop(self)` | 當物件超出作用域時呼叫的析構函數。 |
| **Clone** | **clone** | `clone(self) -> Self` | 建立物件的深拷貝。 |
| **Copy** | *(標記)* | N/A | 指示該類型應使用隱式拷貝而非移動（moves）。 |

## 結構體定義：`Box<T>`

一個簡單的 RAII 智慧型指標，用於管理堆（heap）記憶體。

```zc
struct Box<T> {
    ptr: T*;
}
```

### `Box` 方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **new** | `Box::new() -> Box<T>` | 分配一個新的堆管理實例。 |
| **from_ptr** | `Box::from_ptr(p: T*) -> Box<T>` | 建立一個接管現有指標所有權的 `Box`。 |
| **get** | `get(self) -> T*` | 返回原始內部指標。 |
| **free** | `free(self)` | 手動釋放底層記憶體。 |
| **Trait** | `impl Drop for Box<T>" | 當 box 超出作用域時自動調用 `free()`。 |
