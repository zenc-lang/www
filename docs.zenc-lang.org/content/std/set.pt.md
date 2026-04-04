+++
title = "std/set"
+++

# std/set

`Set<T>` é uma implementação de conjunto de hash genérico para armazenar valores únicos de tipo `T`. Usa uma tabela de hash de endereçamento aberto com sondagem linear.

## Visão Geral

- **Genérico**: Armazena qualquer tipo `T`.
- **Único**: Lida automaticamente com duplicados; adicionar um elemento existente retorna `false`.
- **Rápido**: Complexidade de tempo média O(1) para adições, remoções e pesquisas.
- **RAII**: Implementa o trait `Drop` para gestão automática de memória.

## Uso

```zc
import "std/set.zc"

fn main() {
    let s = Set<int>::new();
    
    s.add(10);
    s.add(20);
    s.add(10); // Duplicado, retorna false
    
    if (s.contains(10)) {
        println "Conjunto contém 10";
    }
    
    s.remove(20);
    println "Comprimento: {s.length()}";
} // s é libertado automaticamente aqui
```

## Definição da Estrutura

```zc
struct Set<T> {
    data: T*;
    len: usize;
    cap: usize;
    // ... campos internos
}
```

## Métodos

### Construção

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **new** | `Set<T>::new() -> Set<T>` | Cria um novo conjunto vazio. |

### Modificação

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **add** | `add(self, val: T) -> bool` | Adiciona um valor ao conjunto. Retorna `true` se adicionado, `false` se já presente. |
| **remove** | `remove(self, val: T) -> bool` | Remove um valor do conjunto. Retorna `true` se presente e removido. |
| **clear** | `clear(self)` | Remove todos os elementos do conjunto sem libertar a memória alocada. |

### Acesso e Consulta

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **contains** | `contains(self, val: T) -> bool` | Retorna `true` se o valor existir no conjunto. |
| **length** | `length(self) -> usize` | Retorna o número de elementos únicos. |
| **is_empty** | `is_empty(self) -> bool` | Retorna `true` se o conjunto não tiver elementos. |
| **capacity** | `capacity(self) -> usize` | Retorna a capacidade interna atual. |

### Utilitários

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **is_slot_occupied** | `is_slot_occupied(self, idx: usize) -> bool` | Verifica se um slot de hash interno específico está ocupado. |
| **val_at** | `val_at(self, idx: usize) -> Option<T>` | Retorna o valor num slot interno específico, se existir. |

## Gestão de Memória

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **free** | `free(self)` | Liberta manualmente os buffers internos do conjunto. |
| **Trait** | `impl Drop for Set` | Chama automaticamente `free()` quando o conjunto sai do escopo. |
