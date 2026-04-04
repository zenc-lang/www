+++
title = "std/sort"
+++

# std/sort

`std/sort` 模組提供了高度優化的排序演算法。它使用零開銷的多型宏引擎原生實現了 `QuickSort` 演算法。

## 使用方法

```zc
import "std/sort.zc"

fn main() {
    let arr: int[5] = [52, 13, 99, 4, 42];
    sort_int((int*)arr, 5); // 變為 [4, 13, 42, 52, 99]
}
```

## 函數

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **sort_int** | `sort_int(arr: int*, len: usize)` | 對標準整數陣列 `[i32]` 進行排序。 |
| **sort_long** | `sort_long(arr: long*, len: usize)` | 對長整數陣列 `[i64]` 進行排序。 |
| **sort_float** | `sort_float(arr: float*, len: usize)` | 對浮點數陣列 `[f32]` 進行排序。 |
| **sort_double** | `sort_double(arr: double*, len: usize)` | 對倍精度浮點數陣列 `[f64]` 進行排序。 |

## 自定義排序

如果您建立了一個帶有 `<` 運算子重載的自定義 `struct`，您可以生成自定義排序器：

```zc
// 產生 `sort_MyStruct(MyStruct* arr, usize len)`
raw { ZC_IMPL_SORT(MyStruct) } 
```
