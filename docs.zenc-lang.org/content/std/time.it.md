+++
title = "std/time"
+++

# std/time

Il modulo `std/time` fornisce utilità per la misurazione del tempo ad alta precisione e la sospensione dei thread.

## Panoramica

- **Precisione al Millisecondo**: `Time::now()` restituisce l'ora di sistema corrente in millisecondi.
- **Tipo Duration**: La struct `Duration` consente calcoli intuitivi degli intervalli di tempo.
- **Sospensione Semplice**: Funzioni facili da usare per sospendere l'esecuzione.
- **Leggero**: Overhead minimo, wrapper delle funzioni temporali standard a livello di sistema.

## Utilizzo

```zc
import "std/time.zc"

fn main() {
    let start = Time::now();
    
    // Sospendi per 1,5 secondi
    Time::sleep(Duration::from_ms(1500));
    
    let end = Time::now();
    println "Trascorso: {end - start} ms";
}
```

## Definizioni Struct

### `Duration`
Rappresenta un intervallo di tempo.
```zc
struct Duration {
    millis: U64;
}
```

### `Time`
Struct di utilità statica per le operazioni temporali di sistema.
```zc
struct Time {}
```

## Metodi

### Metodi di `Duration`

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **from_ms** | `Duration::from_ms(ms: U64) -> Duration` | Crea una `Duration` da un conteggio di millisecondi. |
| **from_secs** | `Duration::from_secs(s: U64) -> Duration` | Crea una `Duration` da un conteggio di secondi. |

### Metodi Statici di `Time`

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **now** | `Time::now() -> U64` | Restituisce l'ora di sistema corrente in millisecondi dall'epoca (epoch). |
| **sleep** | `Time::sleep(d: Duration)` | Sospende il thread corrente per la `Duration` specificata. |
| **sleep_ms** | `Time::sleep_ms(ms: U64)` | Sospende il thread corrente per il conteggio di millisecondi specificato. |
