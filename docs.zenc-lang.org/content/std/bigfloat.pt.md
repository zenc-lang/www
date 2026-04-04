+++
title = "std/bigfloat"
+++

# std/bigfloat

`BigFloat` fornece aritmética de ponto flutuante decimal de precisão arbitrária para Zen-C. É implementado como um `BigInt` escalado, permitindo cálculos de alta precisão sem erros de arredondamento binário.

## Visão Geral

- **Precisão Arbitrária**: Suporta números decimais de qualquer tamanho, limitados apenas pela memória.
- **Representação Escalada**: Usa uma magnitude `BigInt` e uma `scale` inteira para representar valores decimais.
- **Controlo de Precisão**: Alinha facilmente as escalas para adição e subtração precisas.
- **RAII**: A memória para a magnitude subjacente é gerida automaticamente através do trait `Drop`.

## Uso

```zc
import "std/bigfloat.zc"

fn main() {
    let a = BigFloat::from_int(123);
    a.scale = 2; // Representa 1.23
    
    let b = BigFloat::from_int(4567);
    b.scale = 3; // Representa 4.567
    
    let sum = a.add(b);
    
    let s = sum.to_string();
    println "Soma: {s}"; // Soma: 5.797
    free(s);
} // a, b, e sum são libertados automaticamente aqui
```

## Definição da Estrutura

```zc
struct BigFloat {
    magnitude: BigInt;
    scale: int;
}
```

## Métodos

### Construção

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **new** | `BigFloat::new() -> BigFloat` | Cria um novo `BigFloat` inicializado a 0.0. |
| **from_int** | `BigFloat::from_int(val: u64) -> BigFloat` | Cria um `BigFloat` a partir de um inteiro com escala 0. |

### Modificação

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **add** | `add(self, other: BigFloat) -> BigFloat` | Adiciona dois valores `BigFloat`, alinhando automaticamente as suas escalas. Retorna um novo `BigFloat`. |
| **align_scale** | `align_scale(self, target_scale: int)` | Aumenta a escala do `BigFloat` para `target_scale` deslocando a magnitude. |

### Utilidade

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **clone** | `clone(self) -> BigFloat` | Retorna uma cópia profunda do `BigFloat`. |
| **to_string** | `to_string(self) -> char*` | Retorna uma representação em string alocada no heap com o ponto decimal. |

## Gestão de Memória

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **free_mem** | `free_mem(self)` | Liberta manualmente a memória do `BigInt` subjacente. |
| **Trait** | `impl Drop for BigFloat` | Chama automaticamente `free_mem()` quando sai do escopo. |
