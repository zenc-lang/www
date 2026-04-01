+++
title = "10. Genéricos"
weight = 10
+++

# 10. Genéricos


Templates type-safe para Structs e Funções.

```zc
// Struct Genérico
struct Box<T> {
    item: T;
}

// Função Genérica
fn identity<T>(val: T) -> T {
    return val;
}

// Genéricos Multi-parâmetro
struct Pair<K, V> {
    key: K;
    value: V;
}
```
