+++
title = "std/slice"
+++

# std/slice

`Slice<T>` é uma "visão" leve e sem propriedade de uma sequência contígua de elementos. É usado principalmente para fornecer uma interface segura e conveniente para trabalhar com arrays de tamanho fixo.

## Visão Geral

- **Sem propriedade**: As fatias não copiam nem possuem os dados subjacentes; elas apenas apontam para eles.
- **Suporte à Iteração**: Implementa o método `iterator()`, permitindo que as fatias sejam usadas diretamente em loops `for-in`.
- **Conversão Automática**: O compilador Zen-C converte automaticamente arrays de tamanho fixo em fatias ao realizar a iteração ou passar para funções que esperam fatias.
- **Acesso Seguro**: Fornece os métodos `get()` e `at()` com verificação de limites, retornando `Option<T>`.

## Uso

```zc
import "std/slice.zc"

fn main() {
    let arr: int[5] = [10, 20, 30, 40, 50];
    
    // Criação explícita de fatia
    let s = Slice<int>::from_array(arr, 5);
    
    // Iteração direta sobre a fatia
    for val in s {
        println "{val}";
    }
    
    // Iterando diretamente sobre o array (importa automaticamente std/slice.zc)
    for val in arr {
        println "{val}";
    }
}
```

## Definição da Estrutura

```zc
struct Slice<T> {
    data: T*;
    len: usize;
}
```

## Métodos

### Construção

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **from_array** | `Slice<T>::from_array(ptr: T*, len: usize) -> Slice<T>` | Cria uma visão de fatia sobre um ponteiro de array. |
| **new** | `Slice<T>::new(data: T*, len: usize) -> Slice<T>` | Alias para `from_array`. |

### Iteração

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **iterator** | `iterator(self) -> SliceIter<T>` | Retorna um iterador para uso em loops `for-in`. |

### Acesso e Consulta

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **length** | `length(self) -> usize` | Retorna o número de elementos na fatia. |
| **is_empty** | `is_empty(self) -> bool` | Retorna `true` se a fatia não contiver elementos. |
| **get** | `get(self, idx: usize) -> Option<T>` | Retorna o elemento em `idx`, ou `None` se estiver fora dos limites. |
| **at** | `at(self, idx: usize) -> Option<T>` | Alias para `get`. |

## Notas

- **Importação Automática**: `std/slice.zc` é importado automaticamente pelo compilador ao realizar a iteração `for-in` em arrays de tamanho fixo.
- **Segurança**: Embora `data` seja um ponteiro bruto, a estrutura `Slice` incentiva o uso do método `get()`, que reconhece o comprimento, para um acesso seguro.
