+++
title = "std/stack"
+++

# std/stack

Il modulo `std/stack` fornisce una struttura dati pile LIFO (Last-In, First-Out).

## Utilizzo

```zc
import "std/stack.zc"

fn main() {
    let s = Stack<int>::new();
    s.push(10);
    s.push(20);
    
    let top = s.pop(); // Some(20)
} // s viene liberata automaticamente qui
```

## Definizione Struct

```zc
struct Stack<T> {
    // Dettagli di implementazione interna
}
```

## Metodi

### Costruzione

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **new** | `Stack<T>::new() -> Stack<T>` | Crea una nuova pila vuota. |
| **clone** | `clone(self) -> Stack<T>` | Crea una copia profonda della pila. |

### Modifica

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **push** | `push(self, value: T)` | Inserisce un valore in cima alla pila. |
| **pop** | `pop(self) -> Option<T>` | Rimuove e restituisce l'elemento in cima alla pila. Restituisce `None` se vuota. |
| **clear** | `clear(self)` | Rimuove tutti gli elementi dalla pila. |

### Accesso e Query

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **length** | `length(self) -> usize` | Restituisce il numero di elementi nella pila. |
| **is_empty** | `is_empty(self) -> bool` | Restituisce `true` se la pila non contiene elementi. |

## Gestione della Memoria

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **free** | `free(self)` | Libera manualmente la memoria della pila. |
| **Trait** | `impl Drop for Stack` | Chiama automaticamente `free()` quando la pila esce dallo scope. |
