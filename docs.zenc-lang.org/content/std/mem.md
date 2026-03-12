# Standard Library: Memory (`std/mem.zc`)

Core memory management utilities and standard traits for manual memory control, allocation, and lifecycle management.

## Usage

```zc
import "std/mem.zc"

struct MyType { x: int; }

fn main() {
    let ptr = alloc<MyType>();
    mem_zero(ptr, 1);
    free(ptr);
}
```

## Functions

### Allocation

| Function | Signature | Description |
| :--- | :--- | :--- |
| **alloc** | `alloc<T>() -> T*` | Allocates valid memory for a single instance of `T` using `malloc`. |
| **zalloc** | `zalloc<T>() -> T*` | Allocates zero-initialized memory for a single instance of `T` using `calloc`. |
| **alloc_n** | `alloc_n<T>(n: usize) -> T*` | Allocates memory for `n` instances of `T`. |

### Operations

| Function | Signature | Description |
| :--- | :--- | :--- |
| **mem_zero** | `mem_zero<T>(ptr: T*, count: usize)` | Sets memory to zero for `count` elements. |
| **mem_copy** | `mem_copy<T>(dst: T*, src: T*, count: usize)` | Copies `count` elements from `src` to `dst`. |
| **swap** | `swap<T>(a: T*, b: T*)` | Swaps the values at `a` and `b`. |

## Traits

### Lifecycle

| Trait | Method | Signature | Description |
| :--- | :--- | :--- | :--- |
| **Drop** | **drop** | `drop(self)` | Use to define a destructor that runs when the object goes out of scope. |
| **Clone** | **clone** | `clone(self) -> Self` | Use for explicit deep copying of resource-owning types. |
| **Copy** | *(Marker)* | N/A | Marker trait to opt-in to implicit copying (instead of move semantics). |

## Types

### Box

A simple smart pointer wrapper for heap-allocated memory.

```zc
struct Box<T> {
    ptr: T*;
}
```

| Method | Signature | Description |
| :--- | :--- | :--- |
| **new** | `Box::new() -> Box<T>` | Allocates a new instance on the heap (zero-initialized). |
| **from_ptr** | `Box::from_ptr(p: T*) -> Box<T>` | Creates a Box taking ownership of `p`. |
| **get** | `get(self) -> T*` | Returns the raw pointer. |
| **free** | `free(self)` | Frees the underlying memory manually (if not relying on scope). |
