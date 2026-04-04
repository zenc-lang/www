+++
title = "std/bigint"
+++

# std/bigint

`BigInt` fornece aritmética de inteiros de precisão arbitrária para Zen-C. Permite cálculos com inteiros que excedem a capacidade de tipos numéricos padrão como `u64`.

## Visão Geral

- **Precisão Arbitraria**: Os números são limitados apenas pela memória disponível.
- **Base Decimal**: Atualmente utiliza uma representação simples em base 10 por simplicidade.
- **RAII**: Implementa o trait `Drop` para gestão automática de memória do armazenamento interno de dígitos.
- **Conveniente**: Suporta sobrecarga de operadores para aritmética intuitiva.

## Uso

```zc
import "std/bigint.zc"

fn main() {
    let a = BigInt::from_int(1_000_000_000_000_000);
    let b = BigInt::from_int(2_000_000_000_000_000);
    
    // Usa sobrecarga de operadores
    let sum = a + b; 
    
    let s = sum.to_string();
    println "Soma: {s}";
    free(s);
} // sum, a, e b são libertados automaticamente aqui
```

## Definição da Estrutura

```zc
struct BigInt {
    digits: Vec<u8>*;
}
```

## Métodos

### Construção

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **new** | `BigInt::new() -> BigInt` | Cria um novo `BigInt` inicializado a 0. |
| **from_int** | `BigInt::from_int(val: u64) -> BigInt` | Cria um novo `BigInt` a partir de um inteiro de 64 bits. |

### Modificação

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **add_in_place**| `add_in_place(self, other: BigInt)` | Adiciona `other` a `self` através da mutação do estado interno. |

### Utilidade

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **clone** | `clone(self) -> BigInt` | Retorna uma cópia profunda do `BigInt`. |
| **to_string** | `to_string(self) -> char*` | Retorna uma representação em string alocada no heap. |

## Operadores

| Operador | Método | Descrição |
| :--- | :--- | :--- |
| `+` | **add** | Retorna um novo `BigInt` contendo a soma de dois valores. |
| `{}` | **to_string** | Ativa automaticamente a interpolação em strings formatadas. |

## Gestão de Memória

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **free_mem** | `free_mem(self)` | Liberta manualmente o armazenamento subjacente de `Vec` e `BigInt`. |
| **Trait** | `impl Drop for BigInt` | Chama automaticamente `free_mem()` quando sai do escopo. |
