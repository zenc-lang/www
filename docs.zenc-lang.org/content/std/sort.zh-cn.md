+++
title = "std/sort"
+++

# std/sort

`std/sort` 模块提供高度优化的排序算法。它使用零开销的多态宏引擎原生实现了 `QuickSort`（快速排序）算法。

## 使用方法

```zc
import "std/sort.zc"

fn main() {
    let arr: int[5] = [52, 13, 99, 4, 42];
    sort_int((int*)arr, 5); // 变为 [4, 13, 42, 52, 99]
}
```

## 函数

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **sort_int** | `sort_int(arr: int*, len: usize)` | 对标准整数 `[i32]` 数组进行排序。 |
| **sort_long** | `sort_long(arr: long*, len: usize)` | 对长整数 `[i64]` 数组进行排序。 |
| **sort_float** | `sort_float(arr: float*, len: usize)` | 对浮点数 `[f32]` 数组进行排序。 |
| **sort_double** | `sort_double(arr: double*, len: usize)` | 对双精度浮点数 `[f64]` 数组进行排序。 |

## 自定义排序

如果您创建了重载过 `<` 运算符的自定义 `struct`，则可以生成自定义排序器：

```zc
// 发射 `sort_MyStruct(MyStruct* arr, usize len)`
raw { ZC_IMPL_SORT(MyStruct) } 
```
