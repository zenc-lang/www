+++
title = "std/slice"
+++

# std/slice

`Slice<T>` 是一個輕量級的、不具所有權的連續元素序列「視圖」（view）。它主要用於為固定大小的陣列提供一個安全且便捷的介面。

## 概覽

- **不具所有權**：切片（Slices）不會拷貝或擁有底層數據；它們僅是指向數據。
- **迭代支援**：實現了 `iterator()` 方法，允許切片直接用於 `for-in` 迴圈。
- **自動轉換**：當執行迭代或傳遞給預期切片的函數時，Zen-C 編譯器會自動將固定大小陣列轉換為切片。
- **安全存取**：提供邊界檢查的 `get()` 和 `at()` 方法，並返回 `Option<T>`。

## 使用方法

```zc
import "std/slice.zc"

fn main() {
    let arr: int[5] = [10, 20, 30, 40, 50];
    
    // 顯式建立切片
    let s = Slice<int>::from_array(arr, 5);
    
    // 直接迭代切片
    for val in s {
        println "{val}";
    }
    
    // 直接迭代陣列（會自動導入 std/slice.zc）
    for val in arr {
        println "{val}";
    }
}
```

## 結構體定義

```zc
struct Slice<T> {
    data: T*;
    len: usize;
}
```

## 方法

### 構造

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **from_array** | `Slice<T>::from_array(ptr: T*, len: usize) -> Slice<T>` | 在陣列指標上建立一個切片視圖。 |
| **new** | `Slice<T>::new(data: T*, len: usize) -> Slice<T>` | `from_array` 的別名。 |

### 迭代

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **iterator** | `iterator(self) -> SliceIter<T>` | 返回用於 `for-in` 迴圈的迭代器。 |

### 存取與查詢

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **length** | `length(self) -> usize` | 返回切片中的元素數量。 |
| **is_empty** | `is_empty(self) -> bool` | 如果切片不包含元素則返回 `true`。 |
| **get** | `get(self, idx: usize) -> Option<T>` | 返回 `idx` 處的元素，如果越界則返回 `None`。 |
| **at** | `at(self, idx: usize) -> Option<T>` | `get` 的別名。 |

## 注意事項

- **自動導入**：當在固定大小陣列上執行 `for-in` 迭代時，編譯器會自動導入 `std/slice.zc`。
- **安全性**：雖然 `data` 是一個原始指標，但 `Slice` 結構體鼓勵使用感知長度的 `get()` 方法進行安全存取。
