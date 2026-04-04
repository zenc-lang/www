+++
title = "std/queue"
+++

# std/queue

`Queue<T>` é uma fila genérica First-In-First-Out (FIFO) implementada como um **Ring Buffer (Buffer Circular)**.

## Uso

```zc
import "std/queue.zc"

fn main() {
    let q = Queue<int>::new();
    
    q.push(1);
    q.push(2);
    q.push(3);
    
    // Pop retorna uma Option<T>
    if (q.pop().is_some()) {
        println "Desenfileirado: {q.pop().unwrap()}"; // 1
    }
}
```

## Detalhes de Implementação

- **Ring Buffer**: Usa um buffer circular com índices `head` (cabeça) e `tail` (cauda).
- **Desempenho**:
    - `push`: **O(1) amortizado** (redimensiona quando cheio).
    - `pop`: **O(1)** (avança o índice da cabeça).
    - `clone`: **O(N)**.
- **Segurança**: Tratamento seguro do wrapping de memória e redimensionamento.

## Definição da Estrutura

```zc
struct Queue<T> {
    data: T*;
    cap: usize;
    head: usize;
    tail: usize;
    count: usize;
}
```

## Métodos

### Construção

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **new** | `Queue<T>::new() -> Queue<T>` | Cria uma nova fila vazia. |
| **clone** | `clone(self) -> Queue<T>` | Cria uma cópia profunda da fila. |

### Modificação

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **push** | `push(self, value: T)` | Adiciona um elemento ao fim da fila. |
| **pop** | `pop(self) -> Option<T>` | Remove e retorna o elemento no início. Retorna `None` se vazia. |
| **clear** | `clear(self)` | Remove todos os itens da fila. |

### Acesso e Consulta

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **length** | `length(self) -> usize` | Retorna o número de itens. |
| **is_empty** | `is_empty(self) -> bool` | Retorna `true` se a fila estiver vazia. |

## Gestão de Memória

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **free** | `free(self)` | Liberta o buffer interno. |
| **Trait** | `impl Drop for Queue` | Chama automaticamente `free()` quando sai do escopo. |
