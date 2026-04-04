+++
title = "std/random"
+++

# std/random

Il modulo `std/random` fornisce un wrapper idiomatico e orientato agli oggetti per un generatore di numeri pseudo-casuali (PRNG) basato sulle funzioni di `<stdlib.h>` di POSIX.

## Utilizzo

```zc
import "std/random.zc"

fn main() {
    // Inizializza automaticamente il generatore con l'ora corrente
    let rng = Random::new();

    // Genera interi casuali
    let bounded = rng.next_int_range(1, 100); // da 1 a 100 inclusi
    
    println "Estratto: {bounded}";
}
```

## Definizione Struct

```zc
struct Random {
    seed: U32;
}
```

## Metodi

### Inizializzazione

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **new** | `Random::new() -> Random` | Crea un nuovo generatore casuale inizializzato con l'ora di sistema corrente. |
| **from_seed** | `Random::from_seed(seed: U32) -> Random` | Crea un nuovo generatore casuale utilizzando un seed specifico. |

### Generazione

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **next_int** | `next_int(self) -> int` | Restituisce un intero casuale nell'intervallo grezzo `[0, RAND_MAX]`. |
| **next_int_range** | `next_int_range(self, min: int, max: int) -> int` | Restituisce un intero casuale nell'intervallo `[min, max]` inclusi. |
| **next_double** | `next_double(self) -> double` | Restituisce un numero in virgola mobile casuale nell'intervallo `[0.0, 1.0)`. |
| **next_bool** | `next_bool(self) -> bool` | Restituisce un booleano casuale. |
