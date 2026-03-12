# SIMD — Native Vector Types

`import "std/simd.zc";`

Zen C provides native SIMD (Single Instruction, Multiple Data) vector types that compile to GCC/Clang vector extensions.

## Defining Vector Types

Use the `@vector(N)` attribute on a single-field struct to define a vector of N elements:

```zc
@vector(4)
struct f32x4 {
    v: f32;
}
```

This compiles to `typedef float __attribute__((vector_size(4 * sizeof(float)))) f32x4;` in C.

## Predefined Types

The standard library provides comprehensive 128-bit (SSE/NEON) and 256-bit (AVX/AVX2) vector types.

### 128-bit Vectors

| Type | Element | Lanes | Bytes |
|:-----|:--------|:------|:------|
| `f32x4` | `f32` | 4 | 16 |
| `f64x2` | `f64` | 2 | 16 |
| `i32x4` | `i32` | 4 | 16 |
| `u32x4` | `u32` | 4 | 16 |
| `i64x2` | `i64` | 2 | 16 |
| `u64x2` | `u64` | 2 | 16 |
| `i16x8` | `i16` | 8 | 16 |
| `u16x8` | `u16` | 8 | 16 |
| `i8x16` | `i8` | 16 | 16 |
| `u8x16` | `u8` | 16 | 16 |

### 256-bit Vectors

| Type | Element | Lanes | Bytes |
|:-----|:--------|:------|:------|
| `f32x8` | `f32` | 8 | 32 |
| `f64x4` | `f64` | 4 | 32 |
| `i32x8` | `i32` | 8 | 32 |
| `u32x8` | `u32` | 8 | 32 |
| `i64x4` | `i64` | 4 | 32 |
| `u64x4` | `u64` | 4 | 32 |
| `i16x16` | `i16` | 16 | 32 |
| `u16x16` | `u16` | 16 | 32 |
| `i8x32` | `i8` | 32 | 32 |
| `u8x32` | `u8` | 32 | 32 |

## Initialization

### Broadcast (same value to all lanes)
```zc
let a = f32x4{v: 1.0};   // {1.0, 1.0, 1.0, 1.0}
let b = i32x4{v: 42};    // {42, 42, 42, 42}
```

### Per-element (different value per lane)
```zc
let a = f32x4{1.0, 2.0, 3.0, 4.0};
let b = i32x4{10, 20, 30, 40};
```

## Operations

All operations work **element-wise** on every lane simultaneously.

### Arithmetic
```zc
let a = f32x4{1.0, 2.0, 3.0, 4.0};
let b = f32x4{v: 2.0};
let c = a + b;   // {3.0, 4.0, 5.0, 6.0}
let d = a * b;   // {2.0, 4.0, 6.0, 8.0}
let e = b - a;   // {1.0, 0.0, -1.0, -2.0}
let f = b / a;   // {2.0, 1.0, 0.667, 0.5}
```

### Bitwise
```zc
let x = i32x4{v: 0xFF};
let y = i32x4{v: 0xF0};
let z = x & y;   // {0xF0, 0xF0, 0xF0, 0xF0}
let w = x | y;   // {0xFF, 0xFF, 0xFF, 0xFF}
let v = x ^ y;   // {0x0F, 0x0F, 0x0F, 0x0F}
```

### Element Access
```zc
let c = a + b;
let first: f32 = c[0];   // Access individual lanes
let second: f32 = c[1];
```

## Custom Vector Types

You can define your own vector types for any element type and lane count:

```zc
@vector(2)
struct f64x2 {
    v: f64;
}

@vector(32)
struct u8x32 {
    v: u8;
}
```
