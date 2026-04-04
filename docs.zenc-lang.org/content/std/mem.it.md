+++
title = "std/mem"
+++

# std/mem

Il modulo `std/mem` fornisce utilità fondamentali per la gestione della memoria, incluse funzioni di allocazione manuale, trait per il ciclo di vita standard e implementazioni di smart pointer.

## Panoramica

- **Allocazione Manuale**: Wrapper intorno a `malloc`, `calloc` e `free` con firme type-safe.
- **Trait**: Definisce i principali trait del ciclo di vita: `Drop` (distruttori), `Clone` (copie profonde) e `Copy` (copie implicite).
- **Smart Pointer**: Include `Box<T>` per dati allocati nell'heap con pulizia automatica (RAII).
- **Utilità per i Buffer**: Funzioni di alto livello per scambiare, azzerare e copiare la memoria.

## Utilizzo

```zc
import "std/mem.zc"

fn main() {
    // Allocazione manuale
    let ptr = alloc<int>();
    *ptr = 42;
    free(ptr);
    
    // Pulizia automatica con Box (RAII)
    {
        let b = Box<int>::new();
        *b.get() = 100;
        // la memoria viene liberata automaticamente qui
    }
}
```

## Metodi

### Allocazione

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **alloc\<T>**| `alloc<T>() -> T*` | Alloca memoria per una singola istanza di `T`. |
| **zalloc\<T>**| `zalloc<T>() -> T*` | Alloca memoria inizializzata a zero per una singola istanza di `T`. |
| **alloc_n\<T>**| `alloc_n<T>(n: usize) -> T*` | Alloca memoria per un array di `n` istanze di `T`. |

### Operazioni

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **mem_zero\<T>**| `mem_zero<T>(ptr: T*, count: usize)` | Imposta a zero la memoria per `count` istanze di `T`. |
| **mem_copy\<T>**| `mem_copy<T>(dst: T*, src: T*, count: usize)`| Copia `count` istanze di `T` da `src` a `dst`. |
| **swap\<T>** | `swap<T>(a: T*, b: T*)` | Scambia i valori tra due locazioni di memoria. |

## Trait

| Trait | Metodo | Firma | Descrizione |
| :--- | :--- | :--- | :--- |
| **Drop** | **drop** | `drop(self)` | Distruttore chiamato quando l'oggetto esce dallo scope. |
| **Clone** | **clone** | `clone(self) -> Self` | Crea una copia profonda dell'oggetto. |
| **Copy** | *(Marker)* | N/A | Indica che il tipo dovrebbe usare copie implicite invece di spostamenti. |

## Definizione Struct: `Box<T>`

Un semplice smart pointer RAII per la gestione della memoria nell'heap.

```zc
struct Box<T> {
    ptr: T*;
}
```

### Metodi di `Box`

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **new** | `Box::new() -> Box<T>` | Alloca una nuova istanza gestita nell'heap. |
| **from_ptr** | `Box::from_ptr(p: T*) -> Box<T>` | Crea un `Box` che prende la proprietà di un puntatore esistente. |
| **get** | `get(self) -> T*` | Restituisce il puntatore interno grezzo. |
| **free** | `free(self)` | Libera manualmente la memoria sottostante. |
| **Trait** | `impl Drop for Box<T>" | Chiama automaticamente `free()` quando il box esce dallo scope. |
