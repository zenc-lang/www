+++
title = "std/thread"
+++

# std/thread

Il modulo `std/thread` fornisce primitive di alto livello per la creazione e la gestione di thread di esecuzione simultanei.

## Panoramica

- **Thread Nativi**: Utilizza il threading a livello di sistema sottostante (ad esempio, thread POSIX).
- **Supporto alle Closure**: `Thread::spawn` può accettare closure Zen-C, consentendo una facile condivisione dei dati tra i thread.
- **Ciclo di Vita Esplicito**: I thread devono essere esplicitamente uniti (`join`) o scollegati (`detach`) per garantire la corretta pulizia delle risorse.
- **Sicurezza**: Gli errori durante la creazione o la manipolazione dei thread vengono segnalati tramite `Result<bool>`.

## Utilizzo

```zc
import "std/thread.zc"

fn worker(id: int) {
    println "Saluti dal worker {id}";
}

fn main() {
    // Avvio con una closure
    let t = Thread::spawn(|| {
        worker(42);
    }).unwrap();
    
    // In attesa esplicita della fine
    t.join();
}
```

## Definizioni Struct

### `Thread`
Rappresenta un handle a un thread avviato.
```zc
struct Thread {
    handle: void*;
}
```

## Metodi

### Ciclo di Vita di `Thread`

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **spawn** | `Thread::spawn(func: fn()) -> Result<Thread>` | Avvia un nuovo thread che esegue la closure o la funzione fornita. |
| **join** | `join(self) -> Result<bool>` | Blocca il thread corrente finché il thread avviato non termina. |
| **detach** | `detach(self) -> Result<bool>` | Scollega il thread, permettendogli di funzionare in modo indipendente. Le risorse vengono liberate automaticamente al termine. |
| **cancel** | `cancel(self) -> Result<bool>` | Invia una richiesta di cancellazione al thread. |

### Funzioni di Utilità

| Funzione | Firma | Descrizione |
| :--- | :--- | :--- |
| **sleep_ms** | `sleep_ms(ms: int)` | Sospende l'esecuzione del thread corrente per circa `ms` millisecondi. |
