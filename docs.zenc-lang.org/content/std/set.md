# Set (`std/set.zc`)

The `std/set` module provides a Generic Hash Set `Set<T>`.

## Usage

```zc
import "std/set.zc"
```

## Types

### Struct `Set<T>`

A set of unique elements.

#### Methods

- **`fn new() -> Set<T>`**
  Creates a new empty set.

- **`fn add(self, val: T) -> bool`**
  Adds a value to the set. Returns `true` if the value was added, `false` if it was already present.

- **`fn contains(self, val: T) -> bool`**
  Returns `true` if the set contains the value.

- **`fn remove(self, val: T) -> bool`**
  Removes a value from the set. Returns `true` if present and removed.

- **`fn length(self) -> usize`**
  Returns the number of elements in the set.

- **`fn is_empty(self) -> bool`**
  Returns `true` if the set is empty.

- **`fn clear(self)`**
  Removes all elements from the set.
