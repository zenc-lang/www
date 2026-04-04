+++
title = "std/arena"
+++

# std/arena

O módulo `std/arena` fornece um alocador "bump" rápido para alocações de memória em massa. Toda a memória alocada dentro de uma arena é libertada de uma só vez quando a própria arena é destruída ou redefinida.

## Visão Geral

- **Desempenho**: As alocações são extremamente rápidas, envolvendo apenas um único incremento de ponteiro.
- **Libertação em Massa**: Ideal para alocações locais de tarefas ou pedidos onde tudo pode ser libertado ao mesmo tempo.
- **Guardar/Restaurar**: Suporte para "checkpoints" para libertar parcialmente a memória dentro da arena.
- **RAII**: Implementa o trait `Drop` para garantir que o buffer subjacente seja libertado automaticamente.

## Uso

```zc
import "std/arena.zc"

struct Node {
    val: int;
}

fn main() {
    // Criar arena com 1KB de capacidade
    let a = Arena::new(1024);
    
    // Alocações rápidas
    let n1 = a.alloc<Node>();
    let n2 = a.alloc<Node>();
    
    // Duplicar string na memória da arena
    let s = a.dup_str("Hello World");
    
    println "Arena usada: {a.bytes_used()} bytes";
    
    // Tudo é libertado automaticamente quando 'a' sai do escopo
}
```

## Definição da Estrutura

```zc
struct Arena {
    data: void*;
    capacity: usize;
    used: usize;
}
```

## Métodos

### Construção

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **new** | `Arena::new(cap: usize) -> Arena` | Cria uma nova arena com a capacidade especificada. |

### Alocação

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **alloc\<T>** | `alloc<T>(self) -> T*` | Aloca e inicializa com zero a memória para um tipo `T`. |
| **alloc_n\<T>**| `alloc_n<T>(self, count: usize) -> T*` | Aloca memória para um array de `count` elementos do tipo `T`. |
| **alloc_bytes**| `alloc_bytes(self, size: usize) -> void*` | Alocação de bytes brutos (alinhada a 8 bytes). |
| **dup_str** | `dup_str(self, src: char*) -> char*` | Duplica uma string C para a arena. |

### Consulta e Controlo

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **bytes_used** | `bytes_used(self) -> usize` | Retorna o total de bytes atualmente alocados. |
| **bytes_free** | `bytes_free(self) -> usize` | Retorna a capacidade restante. |
| **save** | `save(self) -> usize` | Retorna um "checkpoint" representando o uso atual. |
| **restore** | `restore(self, mark: usize)` | Liberta parcialmente até um checkpoint anterior. |
| **reset** | `reset(self)` | Liberta todas as alocações redefinindo o uso para zero (o buffer é mantido). |

## Gestão de Memória

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **free** | `free(self)` | Liberta explicitamente o buffer da arena subjacente. |
| **Trait** | `impl Drop for Arena` | Chama automaticamente `free()` quando a arena sai do escopo. |
