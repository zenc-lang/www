+++
title = "std/sys/mman"
+++

# std/sys/mman

Il modulo `std/sys/mman` fornisce un'interfaccia Zen-C per la mappatura della memoria e le funzioni di protezione, come wrapper di `sys/mman.h` di POSIX.

## Panoramica

- **Mappatura della Memoria**: Mappa file o memoria anonima nello spazio di indirizzamento del processo.
- **Controllo della Protezione**: Cambia dinamicamente i permessi della regione di memoria (Lettura, Scrittura, Esecuzione).
- **Memoria Anonima**: Alloca grandi blocchi di memoria direttamente dal sistema operativo senza un file.

## Utilizzo

```zc
import "std/sys/mman.zc"
import "std/io.zc"

fn main() {
    let size: usize = 4096;
    let prot = Z_PROT_READ | Z_PROT_WRITE;
    let flags = Z_MAP_PRIVATE | Z_MAP_ANONYMOUS;
    
    let addr = Memory::mmap(size, prot, flags);
    if ((isize)addr == Z_MAP_FAILED) {
        println "Mappatura fallita";
        return;
    }
    
    // Uso della memoria...
    
    Memory::munmap(addr, size);
}
```

## Definizione Struct

```zc
struct Memory {}
```

## Metodi

### Metodi di `Memory`

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **mmap** | `Memory::mmap(len: usize, prot: int, flags: int) -> void*` | Crea una nuova mappatura nello spazio di indirizzi virtuali del processo chiamante. |
| **munmap** | `Memory::munmap(addr: void*, len: usize) -> bool` | Elimina le mappature per l'intervallo di indirizzi specificato. Restituisce `true` in caso di successo. |
| **mprotect** | `Memory::mprotect(addr: void*, len: usize, prot: int) -> bool` | Cambia le protezioni di accesso per le pagine di memoria del processo chiamante. Restituisce `true` in caso di successo. |

## Costanti

### Flag di Protezione
- `Z_PROT_NONE`: La pagina non può essere acceduta.
- `Z_PROT_READ`: La pagina può essere letta.
- `Z_PROT_WRITE`: La pagina può essere scritta.
- `Z_PROT_EXEC`: La pagina può essere eseguita.

### Flag di Visibilità
- `Z_MAP_SHARED`: Condividi questa mappatura.
- `Z_MAP_PRIVATE`: Crea una mappatura copy-on-write privata.
- `Z_MAP_ANONYMOUS`: La mappatura non è supportata da alcun file.

### Valori di Errore
- `Z_MAP_FAILED`: Restituito da `mmap` in caso di errore.
