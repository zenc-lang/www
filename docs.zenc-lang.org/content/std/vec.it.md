+++
title = "std/vec"
+++

# std/vec

`Vec<T>` è un tipo di array contiguo ed espandibile. È l'array dinamico standard utilizzato in Zen-C.

## Panoramica

- **Generico**: Funziona con qualsiasi tipo `T`.
- **Dinamico**: Si ridimensiona automaticamente man mano che vengono aggiunti elementi.
- **Sicuro**: Controlli dei limiti sull'accesso (va in panic in caso di errore).
- **RAII**: Libera automaticamente la memoria quando esce dallo scope (implementa `Drop`).

## Utilizzo

```zc
import "std/vec.zc"

fn main() {
    let v = Vec<int>::new();
    v.push(10);
    v.push(20);
    
    // Iterazione
    for x in &v {
        println "{(*x)}";
    }
} // v viene liberata automaticamente qui
```

## Definizione Struct

```zc
struct Vec<T> {
    data: T*;
    len: usize;
    cap: usize;
}
```

## Metodi

### Costruzione

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **new** | `Vec<T>::new() -> Vec<T>` | Crea un nuovo vettore vuoto. Non alloca memoria fino al primo inserimento. |
| **with_capacity** | `Vec<T>::with_capacity(cap: usize) -> Vec<T>` | Crea un nuovo vettore con una capacità iniziale di `cap`. Utile per l'ottimizzazione se si conosce in anticipo il numero di elementi. |

### Modifica

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **push** | `push(self, item: T)` | Aggiunge un elemento in fondo. Va in panic se l'allocazione fallisce. |
| **pop** | `pop(self) -> T` | Rimuove l'ultimo elemento e lo restituisce. Va in panic se è vuoto. |
| **pop_opt** | `pop_opt(self) -> Option<T>` | Rimuove l'ultimo elemento e restituisce `Some(val)`. Restituisce `None` se è vuoto. Sicuro da usare. |
| **insert** | `insert(self, idx: usize, item: T)` | Inserisce un elemento in `idx`. Sposta gli elementi a destra. Va in panic se `idx > len`. |
| **remove** | `remove(self, idx: usize) -> T` | Rimuove e restituisce l'elemento in `idx`. Sposta gli elementi a sinistra. Va in panic se `idx >= len`. |
| **append** | `append(self, other: Vec<T>)` | Aggiunge tutti gli elementi di `other` a `self`. Consuma `other` (semantica di spostamento). |
| **clear** | `clear(self)` | Rimuove tutti i valori. Non ha effetto sulla capacità allocata. |
| **reverse** | `reverse(self)` | Inverte l'ordine degli elementi sul posto. |

### Accesso

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **get** | `get(self, idx: usize) -> T` | Restituisce una copia dell'elemento in `idx`. Va in panic se fuori dai limiti. |
| **get_ref** | `get_ref(self, idx: usize) -> T*` | Restituisce un puntatore all'elemento in `idx`. Va in panic se fuori dai limiti. Utile per evitare copie. |
| **set** | `set(self, idx: usize, item: T)` | Sovrascrive l'elemento in `idx`. Va in panic se fuori dai limiti. |
| **first** | `first(self) -> T` | Restituisce una copia del primo elemento. Va in panic se è vuoto. |
| **last** | `last(self) -> T` | Restituisce una copia dell'ultimo elemento. Va in panic se è vuoto. |

### Utilità

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **length** | `length(self) -> usize` | Restituisce il numero di elementi. |
| **is_empty** | `is_empty(self) -> bool` | Restituisce `true` se il vettore non contiene elementi. |
| **contains** | `contains(self, item: T) -> bool` | Restituisce `true` se il vettore contiene un elemento uguale a `item` (confronto byte a byte). |
| **clone** | `clone(self) -> Vec<T>` | Restituisce un nuovo vettore con una copia profonda dei dati. |
| **eq** | `eq(self, other: Vec<T>*) -> bool` | Restituisce `true` se due vettori sono uguali byte a byte. Prende un puntatore per evitare di spostare `other`. |

### Operatori

Zen-C supporta l'overloading degli operatori. `Vec<T>` implementa i seguenti:

| Operatore | Metodo | Descrizione |
| :--- | :--- | :--- |
| `+` | **add** | `v1 + &v2`. Restituisce un nuovo vettore (concatenazione). |
| `+=` | **add_assign** | `v1 += &v2`. Aggiunge `v2` a `v1`. |
| `==` | **eq** | `v1 == &v2`. Controllo di uguaglianza strutturale. |
| `!=` | **neq** | `v1 != &v2`. Controllo di disuguaglianza strutturale. |
| `<<` | **shl** | `v << item`. Aggiunge `item` in fondo. |
| `>>` | **shr** | `v >> &item`. Estrae l'ultimo elemento in `item`. |
| `*` | **mul** | `v * n`. Restituisce un nuovo vettore con elementi ripetuti `n` volte. |
| `*=` | **mul_assign** | `v *= n`. Ripete gli elementi sul posto `n` volte. |
| `[]` | **get** / **set** | `v[i]` e `v[i] = x`. Indicizzazione standard. |

### Iterazione

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **iterator** | `iterator(self) -> VecIter<T>` | Restituisce un iteratore che emette copie. Usato da `for x in v`. |
| **iter_ref** | `iter_ref(self) -> VecIterRef<T>` | Restituisce un iteratore che emette puntatori. Usato da `for x in &v` (zucchero sintattico) o `for x in v.iter_ref()`. Consente la modifica sul posto. |

## Gestione della Memoria

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **Free** | `free(self)` | Libera manualmente la memoria. Sicuro da chiamare più volte. |
| **Forget** | `forget(self)` | Scollega il buffer di memoria dal vettore (imposta i campi a 0). Impedisce a `Drop` di liberare la memoria. Utile per implementare la semantica di spostamento o trasferire la proprietà. |
| **Trait** | `impl Drop for Vec" | Chiama automaticamente `free()` quando `Vec` esce dallo scope. |
