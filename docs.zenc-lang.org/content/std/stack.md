# Stack (`std/stack.zc`)

The `std/stack` module provides a LIFO (Last-In, First-Out) stack data structure.

## Usage

```zc
import "std/stack.zc"
```

## Types

### Struct `Stack<T>`

A generic stack.

#### Methods

- **`fn new() -> Stack<T>`**
  Creates a new empty stack.

- **`fn push(self, value: T)`**
  Pushes a value onto the top of the stack.

- **`fn pop(self) -> Option<T>`**
  Removes and returns the top element of the stack. Returns `None` if empty.

- **`fn length(self) -> usize`**
  Returns the number of elements in the stack.

- **`fn is_empty(self) -> bool`**
  Returns `true` if the stack contains no elements.

- **`fn clear(self)`**
  Removes all elements from the stack.

- **`fn clone(self) -> Stack<T>`**
  Creates a deep copy of the stack.
