+++
title = "std/slice"
+++

# std/slice

`Slice<T>` 是一个轻量级的、非所有权的“视图”，指向一段连续的元素序列。它主要用于为操作固定大小数组提供安全且便捷的接口。

## 概览

- **非所有权**：切片不会拷贝或拥有底层数据；它们仅仅是指向数据。
- **迭代支持**：实现了 `iterator()` 方法，允许切片直接在 `for-in` 循环中使用。
- **自动转换**：Zen-C 编译器在执行迭代或传递给期望切片的函数时，会自动将固定大小数组转换为切片。
- **安全访问**：提供带边界检查的 `get()` 和 `at()` 方法，返回 `Option<T>`。

## 使用方法

```zc
import "std/slice.zc"

fn main() {
    let arr: int[5] = [10, 20, 30, 40, 50];
    
    // 显式创建切片
    let s = Slice<int>::from_array(arr, 5);
    
    // 直接遍历切片
    for val in s {
        println "{val}";
    }
    
    // 直接遍历数组（自动导入 std/slice.zc）
    for val in arr {
        println "{val}";
    }
}
```

## 结构体定义

```zc
struct Slice<T> {
    data: T*;
    len: usize;
}
```

## 方法

### 构造

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **from_array** | `Slice<T>::from_array(ptr: T*, len: usize) -> Slice<T>` | 在数组指针上创建一个切片视图。 |
| **new** | `Slice<T>::new(data: T*, len: usize) -> Slice<T>` | `from_array` 的别名。 |

### 迭代

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **iterator** | `iterator(self) -> SliceIter<T>` | 返回一个用于 `for-in` 循环的迭代器。 |

### 访问与查询

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **length** | `length(self) -> usize` | 返回切片中的元素数量。 |
| **is_empty** | `is_empty(self) -> bool` | 如果切片不包含元素，则返回 `true`。 |
| **get** | `get(self, idx: usize) -> Option<T>` | 返回索引 `idx` 处的元素，如果越界则返回 `None`。 |
| **at** | `at(self, idx: usize) -> Option<T>" | `get` 的别名。 |

## 注意事项

- **自动导入**：在对固定大小数组进行 `for-in` 迭代时，编译器会自动导入 `std/slice.zc`。
- **安全性**：虽然 `data` 是原始指针，但 `Slice` 结构体鼓励使用感知长度的 `get()` 方法进行安全访问。
