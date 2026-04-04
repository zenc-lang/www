+++
title = "std/time"
+++

# std/time

O módulo `std/time` fornece utilitários para medição de tempo de alta precisão e suspensão de threads.

## Visão Geral

- **Precisão de Milissegundos**: `Time::now()` retorna o tempo atual do sistema em milissegundos.
- **Tipo Duration**: A estrutura `Duration` permite cálculos intuitivos de intervalos de tempo.
- **Suspensão Simples**: Funções fáceis de usar para suspender a execução.
- **Leve**: Sobrecarga mínima, envolvendo funções de tempo padrão ao nível do sistema.

## Uso

```zc
import "std/time.zc"

fn main() {
    let start = Time::now();
    
    // Suspender por 1,5 segundos
    Time::sleep(Duration::from_ms(1500));
    
    let end = Time::now();
    println "Decorrido: {end - start} ms";
}
```

## Definições de Estruturas

### `Duration`
Representa um intervalo de tempo.
```zc
struct Duration {
    millis: U64;
}
```

### `Time`
Estrutura utilitária estática para operações de tempo do sistema.
```zc
struct Time {}
```

## Métodos

### Métodos `Duration`

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **from_ms** | `Duration::from_ms(ms: U64) -> Duration` | Cria uma `Duration` a partir de uma contagem de milissegundos. |
| **from_secs** | `Duration::from_secs(s: U64) -> Duration` | Cria uma `Duration` a partir de uma contagem de segundos. |

### Métodos Estáticos `Time`

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **now** | `Time::now() -> U64` | Retorna o tempo atual do sistema em milissegundos desde a época (epoch). |
| **sleep** | `Time::sleep(d: Duration)` | Suspende a thread atual pelo intervalo especificado em `Duration`. |
| **sleep_ms** | `Time::sleep_ms(ms: U64)` | Suspende a thread atual pela contagem de milissegundos especificada. |
