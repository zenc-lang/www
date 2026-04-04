+++
title = "std/slice"
+++

# std/slice

`Slice<T>` è una "vista" leggera e senza proprietà su una sequenza contigua di elementi. Viene utilizzato principalmente per fornire un'interfaccia sicura e conveniente per lavorare con array a dimensione fissa.

## Panoramica

- **Senza Proprietà**: Gli slice non copiano né possiedono i dati sottostanti; puntano semplicemente ad essi.
- **Supporto all'Iterazione**: Implementa il metodo `iterator()`, consentendo agli slice di essere utilizzati direttamente nei cicli `for-in`.
- **Conversione Automatica**: Il compilatore Zen-C converte automaticamente gli array a dimensione fissa in slice durante l'esecuzione dell'iterazione o il passaggio a funzioni che richiedono uno slice.
- **Accesso Sicuro**: Fornisce i metodi `get()` e `at()`, con controllo dei limiti, che restituiscono un `Option<T>`.

## Utilizzo

```zc
import "std/slice.zc"

fn main() {
    let arr: int[5] = [10, 20, 30, 40, 50];
    
    // Creazione esplicita dello slice
    let s = Slice<int>::from_array(arr, 5);
    
    // Iterazione diretta sullo slice
    for val in s {
        println "{val}";
    }
    
    // Iterazione diretta sull'array (importa automaticamente std/slice.zc)
    for val in arr {
        println "{val}";
    }
}
```

## Definizione Struct

```zc
struct Slice<T> {
    data: T*;
    len: usize;
}
```

## Metodi

### Costruzione

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **from_array** | `Slice<T>::from_array(ptr: T*, len: usize) -> Slice<T>` | Crea una vista slice su un puntatore ad array. |
| **new** | `Slice<T>::new(data: T*, len: usize) -> Slice<T>` | Alias di `from_array`. |

### Iterazione

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **iterator** | `iterator(self) -> SliceIter<T>` | Restituisce un iteratore per l'uso nei cicli `for-in`. |

### Accesso e Query

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **length** | `length(self) -> usize` | Restituisce il numero di elementi nello slice. |
| **is_empty** | `is_empty(self) -> bool` | Restituisce `true` se lo slice non contiene elementi. |
| **get** | `get(self, idx: usize) -> Option<T>` | Restituisce l'elemento all'indice `idx`, o `None` se fuori dai limiti. |
| **at** | `at(self, idx: usize) -> Option<T>` | Alias di `get`. |

## Note

- **Auto-import**: `std/slice.zc` viene importato automaticamente dal compilatore quando si esegue l'iterazione `for-in` su array a dimensione fissa.
- **Sicurezza**: Sebbene `data` sia un puntatore grezzo, la struct `Slice` incoraggia l'uso del metodo `get()`, consapevole della lunghezza, per un accesso sicuro.
