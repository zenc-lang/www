# Time (`std/time.zc`)

The `std/time` module provides functionality for measuring time and sleeping.

## Usage

```zc
import "std/time.zc"
```

## Structs

### Struct `Duration`

Represents a span of time in milliseconds.

#### Methods

- **`fn from_ms(ms: U64) -> Duration`**
  Creates a duration from milliseconds.

- **`fn from_secs(s: U64) -> Duration`**
  Creates a duration from seconds.

### Struct `Time`

Utilities for time manipulation.

#### Methods

- **`fn now() -> U64`**
  Returns the current system time in milliseconds since the epoch.

- **`fn sleep(d: Duration)`**
  Sleeps for the specified duration.

- **`fn sleep_ms(ms: U64)`**
  Sleeps for the specified number of milliseconds.
