+++
title = "std/result"
+++

# std/result

`Result<T>` è il tipo standard per la gestione degli errori in Zen-C. Rappresenta il successo (`Ok`) contenente un valore di tipo `T`, oppure il fallimento (`Err`) contenente un messaggio di errore in formato stringa.

## Panoramica

- **Sicuro**: Forza la gestione esplicita dei percorsi di successo e fallimento.
- **Informativo**: I casi `Err` portano un messaggio di errore descrittivo.
- **Generico**: Supporta qualsiasi tipo di valore di successo `T`.
- **Integrato**: Funziona perfettamente con macro e pattern basati su `Result` per una propagazione concisa degli errori.

## Utilizzo

```zc
import "std/result.zc"

fn divide(a: int, b: int) -> Result<int> {
    if (b == 0) {
        return Result<int>::Err("Divisione per zero");
    }
    return Result<int>::Ok(a / b);
}

fn main() {
    match divide(10, 0) {
        Ok(val) => println "Risultato: {val}",
        Err(e)  => println "Errore: {e}"
    }
}
```

## Definizione Struct

```zc
struct Result<T> {
    is_ok: bool;
    val: T;
    err: char*;
}
```

## Metodi

### Costruzione

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **Ok** | `Result<T>::Ok(v: T) -> Result<T>` | Crea un risultato di successo contenente `v`. |
| **Err** | `Result<T>::Err(e: char*) -> Result<T>` | Crea un risultato di errore con il messaggio `e`. |

### Query

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **is_ok** | `is_ok(self) -> bool` | Restituisce `true` se il risultato è `Ok`. |
| **is_err** | `is_err(self) -> bool` | Restituisce `true` se il risultato è `Err`. |

### Estrazione

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **unwrap** | `unwrap(self) -> T` | Restituisce il valore ok. Va in panic con il messaggio di errore se è `Err`. |
| **unwrap_ref** | `unwrap_ref(self) -> T*` | Restituisce un puntatore al valore ok. Va in panic se è `Err`. |
| **expect** | `expect(self, msg: char*) -> T` | Restituisce il valore o va in panic con `msg` e il messaggio di errore se è `Err`. |

## Gestione della Memoria

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **forget** | `forget(self)` | Azzera il valore ok senza chiamare i distruttori o liberare memoria. |
