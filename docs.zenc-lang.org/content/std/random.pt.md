+++
title = "std/random"
+++

# std/random

O módulo `std/random` fornece uma cobertura de gerador de números pseudo-aleatórios (PRNG) idiomática e orientada a objetos em torno das funções POSIX `<stdlib.h>`.

## Uso

```zc
import "std/random.zc"

fn main() {
    // Inicializa automaticamente o gerador com o tempo atual
    let rng = Random::new();

    // Gerar inteiros aleatórios
    let bounded = rng.next_int_range(1, 100); // 1 a 100 inclusive
    
    println "Sorteado: {bounded}";
}
```

## Definição da Estrutura

```zc
struct Random {
    seed: U32;
}
```

## Métodos

### Inicialização

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **new** | `Random::new() -> Random` | Cria um novo gerador aleatório inicializado com o tempo atual do sistema. |
| **from_seed** | `Random::from_seed(seed: U32) -> Random` | Cria um novo gerador aleatório usando uma semente específica. |

### Geração

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **next_int** | `next_int(self) -> int` | Retorna um inteiro aleatório no intervalo bruto `[0, RAND_MAX]`. |
| **next_int_range**| `next_int_range(self, min: int, max: int) -> int` | Retorna um inteiro aleatório no intervalo `[min, max]` inclusive. |
| **next_double** | `next_double(self) -> double` | Retorna um número de ponto flutuante aleatório no intervalo `[0.0, 1.0)`. |
| **next_bool** | `next_bool(self) -> bool` | Retorna um booleano aleatório. |
