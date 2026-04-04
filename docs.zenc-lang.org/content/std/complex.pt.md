+++
title = "std/complex"
+++

# std/complex

A biblioteca `std/complex` fornece a estrutura `Complex` e operações matemáticas essenciais para trabalhar com números complexos em Zen-C.

## Visão Geral

- **Tipo de Valor**: Estrutura simples com componentes `real` e `imag`.
- **Suporte de Operadores**: Suporta `+`, `-`, `*`, `/`, `==`, e `!=` através de sobrecarga de operadores.
- **Propriedades**: Fornece métodos para calcular magnitude e fase.
- **Interpolação**: Pode ser usado diretamente em f-strings e instruções print.

## Uso

```zc
import "std/complex.zc"

fn main() {
    let c1 = Complex::new(3.0, 4.0);
    let c2 = Complex::new(1.0, 2.0);
    
    let sum = c1 + c2;
    let prod = c1 * c2;
    
    println "Soma: {sum}";       // Soma: 4.000000 + 6.000000i
    println "Magnitude: {c1.magnitude()}";
}
```

## Definição da Estrutura

```zc
struct Complex {
    real: double;
    imag: double;
}
```

## Métodos

### Construção

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **new** | `Complex::new(r: double, i: double) -> Complex` | Cria um novo número complexo com componente real `r` e componente imaginário `i`. |

### Acesso e Consulta

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **magnitude** | `magnitude(self) -> double` | Retorna a magnitude (valor absoluto) do número complexo. |
| **phase** | `phase(self) -> double` | Retorna a fase (ângulo) em radianos. |

## Operadores

| Operador | Método | Descrição |
| :--- | :--- | :--- |
| `+` | **add** | Adiciona dois números complexos. |
| `-` | **sub** | Subtrai um número complexo de outro. |
| `*` | **mul** | Multiplica dois números complexos. |
| `/` | **div** | Divide um número complexo por outro. |
| `==` | **eq** | Verifica se dois números complexos são estritamente iguais. |
| `!=` | **neq** | Verifica se dois números complexos não são iguais. |
| `{}` | **to_string** | Ativa a interpolação direta de strings. |
