+++
title = "std/stack"
+++

# std/stack

O módulo `std/stack` fornece uma estrutura de dados de pilha LIFO (Last-In, First-Out).

## Uso

```zc
import "std/stack.zc"

fn main() {
    let s = Stack<int>::new();
    s.push(10);
    s.push(20);
    
    let top = s.pop(); // Some(20)
} // s é libertado automaticamente aqui
```

## Definição da Estrutura

```zc
struct Stack<T> {
    // Detalhes da implementação interna
}
```

## Métodos

### Construção

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **new** | `Stack<T>::new() -> Stack<T>` | Cria uma nova pilha vazia. |
| **clone** | `clone(self) -> Stack<T>` | Cria uma cópia profunda da pilha. |

### Modificação

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **push** | `push(self, value: T)` | Empilha um valor no topo da pilha. |
| **pop** | `pop(self) -> Option<T>` | Remove e retorna o elemento no topo da pilha. Retorna `None` se vazia. |
| **clear** | `clear(self)` | Remove todos os elementos da pilha. |

### Acesso e Consulta

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **length** | `length(self) -> usize` | Retorna o número de elementos na pilha. |
| **is_empty** | `is_empty(self) -> bool` | Retorna `true` se a pilha não contiver elementos. |

## Gestão de Memória

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **free** | `free(self)` | Liberta manualmente a memória da pilha. |
| **Trait** | `impl Drop for Stack` | Chama automaticamente `free()` quando a pilha sai do escopo. |
