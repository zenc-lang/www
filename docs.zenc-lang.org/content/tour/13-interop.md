+++
title = "13. C Interoperability"
weight = 13
+++

# 13. C Interoperability


Zen C offers two ways to interact with C code: **Trusted Imports** (Convenient) and **Explicit FFI** (Safe/Precise).

#### Method 1: Trusted Imports (Convenient)

You can import a C header directly using the `import` keyword with the `.h` extension. This treats the header as a module and assumes all symbols accessed through it exist.

```zc
//> link: -lm
import "math.h" as c_math;

fn main() {
    // Compiler trusts correctness; emits 'cos(...)' directly
    let x = c_math::cos(3.14159);
}
```

> **Pros**: Zero boilerplate. Access everything in the header immediately.
> **Cons**: No type safety from Zen C (errors caught by C compiler later).

#### Method 2: Explicit FFI (Safe)

For strict type checking or when you don't want to include the text of a header, use `extern fn`.

```zc
include <stdio.h> // Emits #include <stdio.h> in generated C

// Define strict signature
extern fn printf(fmt: char*, ...) -> c_int;

fn main() {
    printf("Hello FFI: %d\n", 42); // Type checked by Zen C
}
```

> **Pros**: Zen C ensures types match.
> **Cons**: Requires manual declaration of functions.

#### `import` vs `include`

- **`import "file.h"`**: Registers the header as a named module. Enables implicit access to symbols (for example, `file::function()`).
- **`include <file.h>`**: Purely emits `#include <file.h>` in the generated C code. Does not introduce any symbols to the Zen C compiler; you must use `extern fn` to access them.
