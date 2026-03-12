# Concurrency (`std/thread.zc`)

The `std/thread` module provides primitives for multithreading and synchronization.

## Usage

```zc
import "std/thread.zc"
```

## Functions

- **`fn sleep_ms(ms: int)`**
  Sleeps the current thread for the specified number of milliseconds.

## Types

### Type `Thread`

Represents a handle to a spawned thread.

#### Methods

- **`fn spawn(func: fn()) -> Result<Thread>`**
  Spawns a new thread executing the provided function.
  > Note: Currently supports void functions with no arguments.

- **`fn join(self) -> Result<bool>`**
  Blocks the current thread until the spawned thread finishes.

### Type `Mutex`

A mutual exclusion primitive for protecting shared data.

#### Methods

- **`fn new() -> Mutex`**
  Creates a new mutex.

- **`fn lock(self)`**
  Acquires the lock. Blocks if the lock is already held.

- **`fn unlock(self)`**
  Releases the lock.

- **`fn free(self)`**
  Destroys the mutex and frees associated resources.
