+++
title = "std/set"
+++

# std/set

`Set<T>` è un'implementazione generica di un insieme (hash set) per la memorizzazione di valori univoci di tipo `T`. Utilizza una tabella hash a indirizzamento aperto con scansione lineare.

## Panoramica

- **Generico**: Memorizza qualsiasi tipo `T`.
- **Univoco**: Gestisce automaticamente i duplicati; l'aggiunta di un elemento esistente restituisce `false`.
- **Veloce**: Complessità temporale media O(1) per aggiunte, rimozioni e ricerche.
- **RAII**: Implementa il trait `Drop` per la gestione automatica della memoria.

## Utilizzo

```zc
import "std/set.zc"

fn main() {
    let s = Set<int>::new();
    
    s.add(10);
    s.add(20);
    s.add(10); // Duplicato, restituisce false
    
    if (s.contains(10)) {
        println "L'insieme contiene 10";
    }
    
    s.remove(20);
    println "Lunghezza: {s.length()}";
} // s viene liberata automaticamente qui
```

## Definizione Struct

```zc
struct Set<T> {
    data: T*;
    len: usize;
    cap: usize;
    // ... campi interni
}
```

## Metodi

### Costruzione

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **new** | `Set<T>::new() -> Set<T>` | Crea un nuovo insieme vuoto. |

### Modifica

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **add** | `add(self, val: T) -> bool` | Aggiunge un valore all'insieme. Restituisce `true` se aggiunto, `false` se già presente. |
| **remove** | `remove(self, val: T) -> bool` | Rimuove un valore dall'insieme. Restituisce `true` se presente e rimosso. |
| **clear** | `clear(self)` | Rimuove tutti gli elementi dall'insieme senza liberare la memoria allocata. |

### Accesso e Query

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **contains** | `contains(self, val: T) -> bool` | Restituisce `true` se il valore esiste nell'insieme. |
| **length** | `length(self) -> usize` | Restituisce il numero di elementi univoci. |
| **is_empty** | `is_empty(self) -> bool` | Restituisce `true` se l'insieme non ha elementi. |
| **capacity** | `capacity(self) -> usize` | Restituisce la capacità interna attuale. |

### Utilità

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **is_slot_occupied** | `is_slot_occupied(self, idx: usize) -> bool` | Controlla se uno specifico hash slot interno è occupato. |
| **val_at** | `val_at(self, idx: usize) -> Option<T>` | Restituisce il valore in uno slot interno specifico, se presente. |

## Gestione della Memoria

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **free** | `free(self)` | Libera manualmente i buffer interni dell'insieme. |
| **Trait** | `impl Drop for Set" | Chiama automaticamente `free()` quando l'insieme esce dallo scope. |
