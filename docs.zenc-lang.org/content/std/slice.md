# Standard Library: Slice (`std/slice.zc`)

`Slice<T>` is a lightweight, non-owning view into a contiguous sequence of elements. It's particularly useful for working with fixed-size arrays and enabling iteration.

## Usage

```zc
import "std/slice.zc"

fn main() {
    let arr: int[5] = [1, 2, 3, 4, 5];
    
    // Direct iteration (auto-imports std/slice.zc)
    for val in arr {
        println "{val}";
    }
    
    // Manual slice creation
    let slice = Slice<int>::from_array((int*)(&arr), 5);
    for val in slice {
        println "{val}";
    }
}
```

## Structure

```zc
struct Slice<T> {
    data: T*;
    len: usize;
}
```

## Methods

### Construction

| Method | Signature | Description |
| :--- | :--- | :--- |
| **from_array** | `Slice<T>::from_array(arr: T*, len: usize) -> Slice<T>` | Creates a slice view over an array. |
| **new** | `Slice<T>::new(data: T*, len: usize) -> Slice<T>` | Alias for `from_array` (backwards compat). |

### Iteration

| Method | Signature | Description |
| :--- | :--- | :--- |
| **iterator** | `iterator(self) -> SliceIter<T>` | Returns an iterator for `for-in` loops. |

`SliceIter<T>` implements the iterator protocol with a `next() -> Option<T>` method.

### Access & Query

| Method | Signature | Description |
| :--- | :--- | :--- |
| **length** | `length(self) -> usize` | Returns the number of elements. |
| **is_empty** | `is_empty(self) -> bool` | Returns true if length is 0. |
| **get** | `get(self, idx: usize) -> Option<T>` | Returns the element at index, or None if out of bounds. |
| **at** | `at(self, idx: usize) -> Option<T>` | Alias for `get`. |

## Examples

### Iterating over fixed-size arrays

```zc
// std/slice.zc is auto-imported when using for-in on arrays
let numbers: int[3] = [10, 20, 30];

for n in numbers {
    println "Number: {n}";
}
```

### Safe indexed access

```zc
import "std/slice.zc"

let arr: int[3] = [1, 2, 3];
let slice = Slice<int>::from_array((int*)(&arr), 3);

let opt = slice.get(1);
if (!opt.is_none()) {
    println "Value: {opt.unwrap()}";  // Prints: Value: 2
}
```

## Notes

- `Slice<T>` does not own its data — it's just a view
- No memory management needed (no `free()` method)
- **Auto-import**: `std/slice.zc` is automatically imported when using `for val in arr` on a fixed-size array
- The array pointer cast `(T*)(&arr)` is required for fixed-size arrays
