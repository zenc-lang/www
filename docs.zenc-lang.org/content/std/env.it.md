+++
title = "std/env"
+++

# std/env

Il modulo `std/env` fornisce accesso cross-platform alle variabili d'ambiente del processo.

## Panoramica

- **Accesso Chiave-Valore**: Semplice API per ottenere, impostare e rimuovere variabili d'ambiente.
- **Prestato o Posseduto**: Scegli tra `get` (restituisce una stringa C prestata) e `get_dup` (restituisce una `String` posseduta, allocata nell'heap).
- **Cross-platform**: Astrae in modo sicuro le chiamate di sistema sottostanti per la manipolazione dell'ambiente.

## Utilizzo

```zc
import "std/env.zc"

fn main() {
    // Impostazione di una variabile d'ambiente
    Env::set("MY_APP_MODE", "development");

    // Recupero (Prestato)
    match Env::get("MY_APP_MODE") {
        Some(val) => println "Mode: {val}",
        None => println "Mode non impostata"
    }

    // Recupero (String posseduta per RAII)
    match Env::get_dup("HOME") {
        Some(home) => {
             println "Home: {home}";
             // home viene liberata automaticamente
        }
        None => println "HOME non trovata"
    }
}
```

## Definizione Enum

```zc
enum EnvRes {
    OK,
    ERR,
}
```

## Metodi

### Accesso e Query

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **get** | `Env::get(name: char*) -> Option<char*>` | Recupera un puntatore prestato a una variabile d'ambiente. Non liberare. |
| **get_dup** | `Env::get_dup(name: char*) -> Option<String>` | Recupera una variabile d'ambiente come un nuovo oggetto `String`. |

### Modifica

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **set** | `Env::set(name: char*, value: char*) -> EnvRes` | Imposta o aggiorna una variabile d'ambiente. |
| **unset** | `Env::unset(name: char*) -> EnvRes" | Rimuove una variabile d'ambiente dal processo corrente. |
