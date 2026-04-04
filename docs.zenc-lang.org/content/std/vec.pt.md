+++
title = "std/vec"
+++

# std/vec

`Vec<T>` é um tipo de array contíguo e expansível. É o array dinâmico padrão utilizado em Zen-C.

## Visão Geral

- **Genérico**: Funciona com qualquer tipo `T`.
- **Dinâmico**: Redimensiona-se automaticamente quando elementos são adicionados.
- **Seguro**: Verificações de limites no acesso (entra em pânico em caso de falha).
- **RAII**: Liberta automaticamente a memória quando sai de escopo (implementa `Drop`).

## Uso

```zc
import "std/vec.zc"

fn main() {
    let v = Vec<int>::new();
    v.push(10);
    v.push(20);
    
    // Iteração
    for x in &v {
        println "{(*x)}";
    }
} // v é libertado automaticamente aqui
```

## Definição da Estrutura

```zc
struct Vec<T> {
    data: T*;
    len: usize;
    cap: usize;
}
```

## Métodos

### Construção

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **new** | `Vec<T>::new() -> Vec<T>` | Cria um novo vetor vazio. Não aloca memória até ao primeiro push. |
| **with_capacity** | `Vec<T>::with_capacity(cap: usize) -> Vec<T>` | Cria um novo vetor com uma capacidade inicial de `cap`. Útil para otimização se souber o número de elementos antecipadamente. |

### Modificação

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **push** | `push(self, item: T)` | Anexa um elemento ao final. Entra em pânico se a alocação falhar. |
| **pop** | `pop(self) -> T` | Remove o último elemento e retorna-o. Entra em pânico se estiver vazio. |
| **pop_opt** | `pop_opt(self) -> Option<T>` | Remove o último elemento e retorna `Some(val)`. Retorna `None` se estiver vazio. Uso seguro. |
| **insert** | `insert(self, idx: usize, item: T)` | Insere um elemento em `idx`. Desloca elementos para a direita. Entra em pânico se `idx > len`. |
| **remove** | `remove(self, idx: usize) -> T` | Remove e retorna o elemento em `idx`. Desloca elementos para a esquerda. Entra em pânico se `idx >= len`. |
| **append** | `append(self, other: Vec<T>)` | Anexa todos os elementos de `other` a `self`. Consome `other` (semântica de movimento). |
| **clear** | `clear(self)` | Remove todos os valores. Não tem efeito na capacidade alocada. |
| **reverse** | `reverse(self)` | Inverte a ordem dos elementos no local. |

### Acesso

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **get** | `get(self, idx: usize) -> T` | Retorna uma cópia do elemento em `idx`. Entra em pânico se estiver fora dos limites. |
| **get_ref** | `get_ref(self, idx: usize) -> T*` | Retorna um ponteiro para o elemento em `idx`. Entra em pânico se fora dos limites. Útil para evitar cópias. |
| **set** | `set(self, idx: usize, item: T)` | Sobrescreve o elemento em `idx`. Entra em pânico se fora dos limites. |
| **first** | `first(self) -> T` | Retorna uma cópia do primeiro elemento. Entra em pânico se estiver vazio. |
| **last** | `last(self) -> T` | Retorna uma cópia do último elemento. Entra em pânico se estiver vazio. |

### Utilitários

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **length** | `length(self) -> usize` | Retorna o número de elementos. |
| **is_empty** | `is_empty(self) -> bool` | Retorna `true` se o vetor não contiver elementos. |
| **contains** | `contains(self, item: T) -> bool` | Retorna `true` se o vetor contiver um elemento igual a `item` (comparação byte-a-byte). |
| **clone** | `clone(self) -> Vec<T>` | Retorna um novo vetor com uma cópia profunda dos dados. |
| **eq** | `eq(self, other: Vec<T>*) -> bool` | Retorna `true` se dois vetores forem iguais byte-a-byte. Recebe um ponteiro para evitar mover o `other`. |

### Operadores

O Zen-C suporta sobrecarga de operadores. `Vec<T>` implementa o seguinte:

| Operador | Método | Descrição |
| :--- | :--- | :--- |
| `+` | **add** | `v1 + &v2`. Retorna um novo vetor (concatenação). |
| `+=` | **add_assign** | `v1 += &v2`. Anexa `v2` a `v1`. |
| `==` | **eq** | `v1 == &v2`. Verificação de igualdade estrutural. |
| `!=` | **neq** | `v1 != &v2`. Verificação de desigualdade estrutural. |
| `<<` | **shl** | `v << item`. Adiciona o `item` ao final. |
| `>>` | **shr** | `v >> &item`. Remove o último elemento e coloca-o em `item`. |
| `*` | **mul** | `v * n`. Retorna um novo vetor com os elementos repetidos `n` vezes. |
| `*=` | **mul_assign** | `v *= n`. Repete os elementos no local `n` vezes. |
| `[]` | **get** / **set** | `v[i]` e `v[i] = x`. Indexação padrão. |

### Iteração

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **iterator** | `iterator(self) -> VecIter<T>` | Retorna um iterador que produz cópias. Usado por `for x in v`. |
| **iter_ref** | `iter_ref(self) -> VecIterRef<T>` | Retorna um iterador que produz ponteiros. Usado por `for x in &v` ou `for x in v.iter_ref()`. Permite modificações no local. |

## Gerenciamento de Memória

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **Free** | `free(self)` | Liberta manualmente a memória. Seguro para chamar múltiplas vezes. |
| **Forget** | `forget(self)` | Desvincula o buffer de memória do vetor (define os campos para 0). Evita que o `Drop` liberte a memória. Útil para implementar semântica de movimento ou transferir propriedade. |
| **Trait** | `impl Drop for Vec` | Chama automaticamente `free()` quando o `Vec` sai de escopo. |
走
走
走
走
走
走
