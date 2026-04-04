+++
title = "std/mem"
+++

# std/mem

`std/mem` 模块提供了核心内存 management 工具，包括手动分配函数、标准生命周期 trait 以及智能指针实现。

## 概览

- **手动分配**：对 `malloc`、`calloc` 和 `free` 的封装，具有类型安全的签名。
- **Trait**：定义了主要的生命周期 trait：`Drop`（析构）、`Clone`（深拷贝）和 `Copy`（隐式拷贝）。
- **智能指针**：包含 `Box<T>`，用于具有自动清理功能 (RAII) 的堆分配数据。
- **缓冲区工具**：用于内存交换、清零和拷贝的高级函数。

## 使用方法

```zc
import "std/mem.zc"

fn main() {
    // 手动分配
    let ptr = alloc<int>();
    *ptr = 42;
    free(ptr);
    
    // 使用 Box 进行自动清理 (RAII)
    {
        let b = Box<int>::new();
        *b.get() = 100;
        // 内存在此处自动释放
    }
}
```

## 方法

### 分配

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **alloc\<T>**| `alloc<T>() -> T*` | 为单个 `T` 实例分配内存。 |
| **zalloc\<T>**| `zalloc<T>() -> T*` | 为单个 `T` 实例分配零初始化的内存。 |
| **alloc_n\<T>**| `alloc_n<T>(n: usize) -> T*` | 为 `n` 个 `T` 实例的数组分配内存。 |

### 操作

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **mem_zero\<T>**| `mem_zero<T>(ptr: T*, count: usize)` | 将 `count` 个 `T` 实例的内存清零。 |
| **mem_copy\<T>**| `mem_copy<T>(dst: T*, src: T*, count: usize)`| 将 `count` 个 `T` 实例从 `src` 拷贝到 `dst`。 |
| **swap\<T>** | `swap<T>(a: T*, b: T*)` | 交换两个内存位置的值。 |

## Trait

| Trait | 方法 | 签名 | 说明 |
| :--- | :--- | :--- | :--- |
| **Drop** | **drop** | `drop(self)` | 当对象超出作用域时调用的析构方法。 |
| **Clone** | **clone** | `clone(self) -> Self` | 创建对象的深拷贝。 |
| **Copy** | *(Marker)* | N/A | 指示该类型应使用隐式拷贝而非移动。 |

## 结构体定义: `Box<T>`

一个用于管理堆内存的简单 RAII 智能指针。

```zc
struct Box<T> {
    ptr: T*;
}
```

### `Box` 方法

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **new** | `Box::new() -> Box<T>` | 分配一个新的堆托管实例。 |
| **from_ptr** | `Box::from_ptr(p: T*) -> Box<T>` | 创建一个接管现有指针所有权的 `Box`。 |
| **get** | `get(self) -> T*` | 返回内部原始指针。 |
| **free** | `free(self)` | 手动释放底层内存。 |
| **Trait** | `impl Drop for Box<T>" | 当 box 超出作用域时自动调用 `free()`。 |
