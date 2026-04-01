+++
title = "12. Advanced & Metaprogramming"
weight = 12
+++

### Metaprogramming

#### Comptime
Run code at compile-time to generate source or print messages.
```zc
comptime {
    // Generate code at compile-time (written to stdout)
    println "let build_date = \"2024-01-01\";";
}

println "Build Date: {build_date}";
```

Special functions available inside `comptime` blocks:
- `yield(str)` / `code(str)`: Explicitly emit generated code.
- `compile_error(msg)`: Halt compilation with a fatal error message.
- `compile_warn(msg)`: Emit a compile-time warning.

Access compiler build information at compile-time:
- `__COMPTIME_TARGET__`: Platform (`linux`, `windows`, `macos`)
- `__COMPTIME_FILE__`: Current source filename being compiled

#### Embed
Embed files as specified types.
```zc
// Default (Slice_char)
let data = embed "assets/logo.png";

// Typed Embed
let text = embed "shader.glsl" as string;    // Embbed as C-string
let rom  = embed "bios.bin" as u8[1024];     // Embed as fixed array
let wav  = embed "sound.wav" as u8[];        // Embed as Slice_u8
```

#### Conditional Compilation
Use `@cfg()` to conditionally include or exclude any top-level declaration based on `-D` flags.

```zc
// Build with: zc build app.zc -DUSE_OPENGL

@cfg(USE_OPENGL)
import "opengl_backend.zc";

@cfg(USE_VULKAN)
import "vulkan_backend.zc";

// OR: include if any backend is selected
@cfg(any(USE_OPENGL, USE_VULKAN))
fn init_graphics() { /* ... */ }

// AND with negation
@cfg(not(USE_OPENGL))
@cfg(not(USE_VULKAN))
fn fallback_init() { println "No backend selected"; }
```

### Attributes

Decorate functions and structs to modify compiler behavior. Zen C supports standard attributes (`@inline`, `@packed`, `@noreturn`) as well as **Custom Attributes** that map directly to C `__attribute__`.

| Attribute | Scope | Description |
|:---|:---|:---|
| `@required` | Fn | Warn if return value is ignored. |
| `@deprecated("msg")` | Fn/Struct | Warn on usage with message. |
| `@inline` | Fn | Hint compiler to inline. |
| `@packed` | Struct | Remove padding between fields. |
| `@constructor` | Fn | Run before main. |
| `@destructor` | Fn | Run after main exits. |
| `@derive(...)` | Struct | Auto-implement traits. Supports `Debug`, `Eq` (Smart Derive), `Copy`, `Clone`. |
| `@global`, `@device`, `@host` | Fn | CUDA specific attributes. |

### Inline Assembly

Zen C provides first-class support for inline assembly, transpiling directly to GCC-style extended `asm`.

```zc
// Syntax: : out(variable) : in(variable) : clobber(reg)
// Uses {variable} placeholder syntax for readability

fn add_five(x: int) -> int {
    let result: int;
    asm {
        "mov {x}, {result}"
        "add $5, {result}"
        : out(result)
        : in(x)
        : clobber("cc")
    }
    return result;
}
```

### Build Directives

Zen C supports special comments at the top of your source file to configure the build process without needing a complex build system or Makefile.

| Directive | Arguments | Description |
|:---|:---|:---|
| `//> link:` | `-lfoo` or `path/to/lib.a` | Link against a library or object file. |
| `//> lib:` | `path/to/libs` | Add a library search path (`-L`). |
| `//> include:` | `path/to/headers` | Add an include search path (`-I`). |
| `//> framework:` | `Cocoa` | Link against a macOS framework. |
| `//> cflags:` | `-Wall -O3` | Pass arbitrary flags to the C compiler. |
| `//> define:` | `MACRO` or `KEY=VAL` | Define a preprocessor macro (`-D`). |
| `//> pkg-config:` | `gtk+-3.0` | Run `pkg-config` and append `--cflags` and `--libs`. |

Prefix directives with an OS name to apply them only on specific platforms (e.g. `//> linux: link: -lm`).

### Keywords

The following keywords are reserved in Zen C.

- **Declarations**: `alias`, `def`, `enum`, `fn`, `impl`, `import`, `let`, `module`, `opaque`, `struct`, `trait`, `union`, `use`
- **Control Flow**: `async`, `await`, `break`, `catch`, `continue`, `defer`, `do`, `else`, `for`, `goto`, `guard`, `if`, `loop`, `match`, `return`, `try`, `unless`, `while`
- **Special**: `asm`, `assert`, `autofree`, `comptime`, `const`, `embed`, `launch`, `ref`, `sizeof`, `static`, `test`, `volatile`
- **Constants**: `true`, `false`, `null`
- **Operators**: `and`, `or`
