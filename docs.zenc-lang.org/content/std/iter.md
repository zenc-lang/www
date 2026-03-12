# Standard Library: Iterator (`std/iter.zc`)

Use `std/iter.zc` to define custom iterators compatible with `for-in` loops. By implementing the `Iterable` trait, your types can integrate seamlessly with Zen C's loop syntax.

## Usage

```zc
import "std/iter.zc"

// Assuming Mycollection implements Iterable<T>
for item in my_collection {
    // ...
}
```

## Traits

### Iterator

An interface for advancing through a sequence.

```zc
trait Iterator<T> {
    fn next(self) -> Option<T>;
}
```

| Method | Signature | Description |
| :--- | :--- | :--- |
| **next** | `next(self) -> Option<T>` | Returns `Option<T>::Some(item)` if there is a next item, or `Option<T>::None` if iteration is complete. |

### Iterable

An interface for types that can produce an `Iterator`.

```zc
trait Iterable<T> {
    fn iterator(self) -> Iterator<T>;
}
```

| Method | Signature | Description |
| :--- | :--- | :--- |
| **iterator** | `iterator(self) -> Iterator<T>` | Creates and returns an iterator for the collection. |
