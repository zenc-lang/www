+++
title = "std/sys/signal"
+++

# std/sys/signal

Il modulo `std/sys/signal` fornisce primitive per la gestione dei segnali di sistema, come wrapper della funzionalità `signal.h` di POSIX.

## Panoramica

- **Intercettazione dei Segnali**: Definisci gestori personalizzati per segnali come `SIGINT` (Ctrl+C).
- **Terminazione Corretta**: Usa i gestori di segnali per eseguire la pulizia prima di uscire.
- **Costanti Comuni**: Fornisce definizioni cross-platform per i segnali standard.

## Utilizzo

```zc
import "std/sys/signal.zc"
import "std/io.zc"

fn on_interrupt(sig: int) {
    println "Ricevuto SIGINT ({sig}). Pulizia in corso...";
    exit(0);
}

fn main() {
    Signal::set_handler(Z_SIGINT, on_interrupt);
    println "In attesa di Ctrl+C...";
    while(true) {}
}
```

## Definizione Struct

```zc
struct Signal {}
```

## Metodi

### Metodi di `Signal`

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **set_handler** | `Signal::set_handler(sig: int, handler: fn*(int)) -> fn*(int)` | Registra un gestore per il segnale dato e restituisce il gestore precedente. |

## Costanti

### Segnali Standard
- `Z_SIGINT`: Interruzione da tastiera (Ctrl+C).
- `Z_SIGILL`: Istruzione illegale.
- `Z_SIGABRT`: Segnale di aborto.
- `Z_SIGFPE`: Eccezione in virgola mobile.
- `Z_SIGSEGV`: Violazione di segmentazione (accesso alla memoria non valido).
- `Z_SIGTERM`: Segnale di terminazione.
