+++
title = "std/mem"
+++

# std/mem

O módulo `std/mem` fornece utilitários principais de gestão de memória, incluindo funções de alocação manual, traits de ciclo de vida padrão e implementações de ponteiros inteligentes.

## Visão Geral

- **Alocação Manual**: Coberturas em torno de `malloc`, `calloc`, e `free` com assinaturas tipadas.
- **Traits**: Define os principais traits de ciclo de vida: `Drop` (destrutores), `Clone` (cópias profundas), e `Copy` (cópias implícitas).
- **Ponteiros Inteligentes**: Inclui `Box<T>` para dados alocados no heap com limpeza automática (RAII).
- **Utilitários de Buffer**: Funções de alto nível para trocar, zerar e copiar memória.

## Uso

```zc
import "std/mem.zc"

fn main() {
    // Alocação manual
    let ptr = alloc<int>();
    *ptr = 42;
    free(ptr);
    
    // Limpeza automática com Box (RAII)
    {
        let b = Box<int>::new();
        *b.get() = 100;
        // memória é libertada automaticamente aqui
    }
}
```

## Métodos

### Alocação

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **alloc\<T>**| `alloc<T>() -> T*` | Aloca memória para uma única instância de `T`. |
| **zalloc\<T>**| `zalloc<T>() -> T*` | Aloca memória inicializada com zero para uma única instância de `T`. |
| **alloc_n\<T>**| `alloc_n<T>(n: usize) -> T*` | Aloca memória para um array de `n` instâncias de `T`. |

### Operações

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **mem_zero\<T>**| `mem_zero<T>(ptr: T*, count: usize)` | Define a memória para `count` instâncias de `T` como zero. |
| **mem_copy\<T>**| `mem_copy<T>(dst: T*, src: T*, count: usize)`| Copia `count` instâncias de `T` de `src` para `dst`. |
| **swap\<T>** | `swap<T>(a: T*, b: T*)` | Troca os valores entre dois locais de memória. |

## Traits

| Trait | Método | Assinatura | Descrição |
| :--- | :--- | :--- | :--- |
| **Drop** | **drop** | `drop(self)` | Destrutor chamado quando o objeto sai do escopo. |
| **Clone** | **clone** | `clone(self) -> Self` | Cria uma cópia profunda do objeto. |
| **Copy** | *(Marcador)* | N/A | Indica que o tipo deve usar cópias implícitas em vez de movimentos. |

## Definição da Estrutura: `Box<T>`

Um ponteiro inteligente RAII simples para gerir memória do heap.

```zc
struct Box<T> {
    ptr: T*;
}
```

### Métodos `Box`

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **new** | `Box::new() -> Box<T>` | Aloca uma nova instância gerida pelo heap. |
| **from_ptr** | `Box::from_ptr(p: T*) -> Box<T>` | Cria um `Box` que assume a titularidade de um ponteiro existente. |
| **get** | `get(self) -> T*` | Retorna o ponteiro interno bruto. |
| **free** | `free(self)` | Liberta manualmente a memória subjacente. |
| **Trait** | `impl Drop for Box<T>` | Chama automaticamente `free()` quando o box sai do escopo. |
