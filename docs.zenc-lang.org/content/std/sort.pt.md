+++
title = "std/sort"
+++

# std/sort

O módulo `std/sort` fornece algoritmos de ordenação altamente otimizados. Implementa nativamente o algoritmo `QuickSort` usando um motor de macros polimórfico de custo zero.

## Uso

```zc
import "std/sort.zc"

fn main() {
    let arr: int[5] = [52, 13, 99, 4, 42];
    sort_int((int*)arr, 5); // Torna-se [4, 13, 42, 52, 99]
}
```

## Funções

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **sort_int** | `sort_int(arr: int*, len: usize)` | Ordena um array de inteiros padrão `[i32]`. |
| **sort_long** | `sort_long(arr: long*, len: usize)` | Ordena um array de inteiros longos `[i64]`. |
| **sort_float** | `sort_float(arr: float*, len: usize)` | Ordena um array de floats `[f32]`. |
| **sort_double** | `sort_double(arr: double*, len: usize)` | Ordena um array de doubles `[f64]`. |

## Ordenação Personalizada

Se criar uma `struct` personalizada com sobrecarga do operador `<`, pode gerar um ordenador personalizado:

```zc
// Emite `sort_MyStruct(MyStruct* arr, usize len)`
raw { ZC_IMPL_SORT(MyStruct) } 
```
