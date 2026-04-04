+++
title = "std/math"
+++

# std/math

O módulo `Math` fornece um conjunto principal de constantes e funções matemáticas padrão. Atua como uma cobertura Zen-C em torno das operações matemáticas de ponto flutuante padrão.

## Visão Geral

- **Métodos Estáticos**: Todos os métodos são chamados diretamente na estrutura `Math`.
- **Precisão**: Usa `double` para aritmética de ponto flutuante de alta precisão.
- **Abrangente**: Cobre trigonometria, exponenciais, logaritmos e arredondamento.
- **Eficiente**: Envolve diretamente funções otimizadas da biblioteca C.

## Uso

```zc
import "std/math.zc"

fn main() {
    let radius = 5.0;
    let area = Math::PI() * Math::pow(radius, 2.0);
    println "Área do círculo: {area}";
}
```

## Constantes

Todas as constantes são funções estáticas que retornam um `double`.

| Constante | Descrição |
| :--- | :--- |
| **Math::PI()** | Constante de Arquimedes (aproximadamente 3.14159). |
| **Math::E()** | Número de Euler (aproximadamente 2.71828). |

## Métodos

### Aritmética

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **abs** | `abs(x: double) -> double` | Retorna o valor absoluto de `x`. |
| **sqrt** | `sqrt(x: double) -> double` | Retorna a raiz quadrada de `x`. |
| **pow** | `pow(base: double, exp: double) -> double` | Retorna `base` elevado à potência de `exp`. |
| **exp** | `exp(x: double) -> double` | Retorna `e` elevado à potência de `x`. |
| **log** | `log(x: double) -> double` | Retorna o logaritmo natural (base-e) de `x`. |
| **log10** | `log10(x: double) -> double` | Retorna o logaritmo de base 10 de `x`. |

### Trigonometria

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **sin** | `sin(x: double) -> double` | Retorna o seno de `x` (radianos). |
| **cos** | `cos(x: double) -> double` | Retorna o cosseno de `x` (radianos). |
| **tan** | `tan(x: double) -> double` | Retorna a tangente de `x` (radianos). |
| **asin** | `asin(x: double) -> double` | Retorna o arco seno de `x`. |
| **acos** | `acos(x: double) -> double` | Retorna o arco cosseno de `x`. |
| **atan** | `atan(x: double) -> double` | Retorna o arco tangente de `x`. |
| **atan2** | `atan2(y: double, x: double) -> double" | Retorna o arco tangente de `y/x`. |

### Arredondamento e Resto

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **ceil** | `ceil(x: double) -> double` | Arredonda para cima para o inteiro mais próximo. |
| **floor** | `floor(x: double) -> double` | Arredonda para baixo para o inteiro mais próximo. |
| **round** | `round(x: double) -> double` | Arredonda para o inteiro mais próximo. |
| **mod** | `mod(x: double, y: double) -> double` | Calcula o resto de ponto flutuante de `x / y`. |

### Mín / Máx

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **max** | `max(a: double, b: double) -> double` | Retorna o maior de dois valores. |
| **min** | `min(a: double, b: double) -> double` | Retorna o menor de dois valores. |
