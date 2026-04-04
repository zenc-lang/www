+++
title = "std/sync"
+++

# std/sync

Il modulo `std/sync` fornisce una suite completa di primitive di sincronizzazione per la gestione dell'accesso simultaneo ai dati condivisi e il coordinamento dell'esecuzione dei thread.

## Panoramica

- **Primitive Standard**: Include `Mutex`, `CondVar`, `RwLock`, `Once`, `Semaphore` e `Barrier`.
- **Integrazione RAII**: Tutte le primitive implementano il trait `Drop`, garantendo che le risorse di sistema (come gli handle pthread) vengano rilasciate automaticamente.
- **Cross-platform**: Astrae in modo sicuro le particolarità della piattaforma (ad esempio, implementando `Barrier` e `Semaphore` tramite mutex/condvar su macOS).
- **Efficienza**: Sottili wrapper intorno a librerie di sincronizzazione a livello di sistema ottimizzate.

## Utilizzo

```zc
import "std/sync.zc"

fn main() {
    let m = Mutex::new();
    
    // Scoped lock (RAII)
    {
        m.lock();
        // Sezione critica
        m.unlock();
    } // m viene liberata automaticamente se era l'ultimo proprietario
    
    // Inizializzazione una tantum
    let once = Once::new();
    once.call(|| {
        println "Inizializzato!";
    });
}
```

## Definizioni Struct

### `Mutex`
Un lucchetto a mutua esclusione per proteggere i dati condivisi.

### `CondVar`
Una variabile di condizione per la segnalazione tra thread basata sui cambiamenti di stato.

### `RwLock`
Un lucchetto lettore-scrittore che consente più lettori simultanei ma un solo scrittore.

### `Once`
Garantisce che un pezzo specifico di codice di inizializzazione venga eseguito esattamente una volta.

### `Semaphore`
Un semaforo a conteggio per controllare l'accesso a un pool di risorse.

### `Barrier`
Un punto di sincronizzazione in cui più thread devono attendere finché non ne è arrivato un numero specifico.

## Metodi

### Metodi di `Mutex`

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **new** | `Mutex::new() -> Mutex` | Crea un nuovo mutex. |
| **lock** | `lock(self)` | Acquisisce il blocco (bloccante). |
| **try_lock** | `try_lock(self) -> bool` | Tenta di acquisire il blocco senza bloccare. |
| **unlock** | `unlock(self)` | Rilascia il blocco. |

### Metodi di `CondVar`

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **new** | `CondVar::new() -> CondVar` | Crea una nuova variabile di condizione. |
| **wait** | `wait(self, mutex: Mutex*)` | Blocca il thread finché non viene segnalato, rilasciando temporaneamente il mutex. |
| **signal** | `signal(self)` | Sveglia un thread in attesa su questa condizione. |
| **broadcast**| `broadcast(self)` | Sveglia tutti i thread in attesa su questa condizione. |

### Metodi di `RwLock`

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **new** | `RwLock::new() -> RwLock` | Crea un nuovo lucchetto lettore-scrittore. |
| **rdlock** | `rdlock(self)` | Acquisisce un blocco di lettura condiviso. |
| **wrlock** | `wrlock(self)` | Acquisisce un blocco di scrittura esclusivo. |
| **unlock** | `unlock(self)` | Rilascia qualsiasi blocco detenuto. |

### Metodi di `Semaphore`

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **new** | `Semaphore::new(value: int) -> Semaphore` | Crea un nuovo semaforo con un `value` iniziale. |
| **wait** | `wait(self)` | Decrementa il semaforo (bloccando se è 0). |
| **post** | `post(self)` | Incrementa il semaforo. |
| **value** | `value(self) -> int` | Restituisce il valore attuale. |

### Metodi di `Barrier`

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **new** | `Barrier::new(count: int) -> Barrier` | Crea una nuova barriera per `count` thread. |
| **wait** | `wait(self) -> bool` | Attende alla barriera. Restituisce `true` per il leader designato. |

## Gestione della Memoria

Tutte le primitive implementano `impl Drop` e chiameranno automaticamente il loro metodo `free()` interno per rilasciare le risorse di sistema quando escono dallo scope.
