# Standard Library: Bits (`std/bits.zc`)

The `Bits` module provides low-level bitwise operations that are generally implemented via compiler intrinsics rather than native operators, specifically bitwise rotation (circular shift).

## Overview

- **Safe**: Automatically masks shift amounts and handles `0`-shifts to prevent undefined behavior.
- **Optimized**: Follows strict C-language idioms that modern compilers natively recognize and lower into single `rol` / `ror` assembly instructions for zero-overhead performance.

## Usage

```zc
import "std/bits.zc"

fn main() {
    let a: u32 = 0x80000001; // 1000...0001
    
    // Left rotate by 1
    let left = Bits::rotl32(a, 1); 
    println "{left}"; // Outputs: 3 (0000...0011)

    // Right rotate by 1
    let right = Bits::rotr32(a, 1); 
    println "{right}"; // Outputs: 3221225472 (1100...0000)
}
```

## Methods

### 8-Bit Operations

| Method | Signature | Description |
| :--- | :--- | :--- |
| **rotl8** | `Bits::rotl8(n: u8, c: u8) -> u8` | Rotates `n` left by `c` bits. |
| **rotr8** | `Bits::rotr8(n: u8, c: u8) -> u8` | Rotates `n` right by `c` bits. |

### 16-Bit Operations

| Method | Signature | Description |
| :--- | :--- | :--- |
| **rotl16** | `Bits::rotl16(n: u16, c: u16) -> u16` | Rotates `n` left by `c` bits. |
| **rotr16** | `Bits::rotr16(n: u16, c: u16) -> u16` | Rotates `n` right by `c` bits. |

### 32-Bit Operations

| Method | Signature | Description |
| :--- | :--- | :--- |
| **rotl32** | `Bits::rotl32(n: u32, c: u32) -> u32` | Rotates `n` left by `c` bits. |
| **rotr32** | `Bits::rotr32(n: u32, c: u32) -> u32` | Rotates `n` right by `c` bits. |

### 64-Bit Operations

| Method | Signature | Description |
| :--- | :--- | :--- |
| **rotl64** | `Bits::rotl64(n: u64, c: u64) -> u64` | Rotates `n` left by `c` bits. |
| **rotr64** | `Bits::rotr64(n: u64, c: u64) -> u64` | Rotates `n` right by `c` bits. |

### 128-Bit Operations

| Method | Signature | Description |
| :--- | :--- | :--- |
| **rotl128** | `Bits::rotl128(n: u128, c: u128) -> u128` | Rotates `n` left by `c` bits. |
| **rotr128** | `Bits::rotr128(n: u128, c: u128) -> u128` | Rotates `n` right by `c` bits. |

### Population Count (Hamming Weight)

| Method | Signature | Description |
| :--- | :--- | :--- |
| **popcount8** | `Bits::popcount8(n: u8) -> u8` | Returns the number of 1s in the binary representation of `n`. |
| **popcount16** | `Bits::popcount16(n: u16) -> u16` | Returns the number of 1s in the binary representation of `n`. |
| **popcount32** | `Bits::popcount32(n: u32) -> u32` | Returns the number of 1s in the binary representation of `n`. |
| **popcount64** | `Bits::popcount64(n: u64) -> u64` | Returns the number of 1s in the binary representation of `n`. |
| **popcount128** | `Bits::popcount128(n: u128) -> u128` | Returns the number of 1s in the binary representation of `n`. |

### Count Leading Zeros (clz)

| Method | Signature | Description |
| :--- | :--- | :--- |
| **clz8** | `Bits::clz8(n: u8) -> u8` | Returns the number of leading zero bits in `n`. |
| **clz16** | `Bits::clz16(n: u16) -> u16` | Returns the number of leading zero bits in `n`. |
| **clz32** | `Bits::clz32(n: u32) -> u32` | Returns the number of leading zero bits in `n`. |
| **clz64** | `Bits::clz64(n: u64) -> u64` | Returns the number of leading zero bits in `n`. |
| **clz128** | `Bits::clz128(n: u128) -> u128` | Returns the number of leading zero bits in `n`. |

### Count Trailing Zeros (ctz)

| Method | Signature | Description |
| :--- | :--- | :--- |
| **ctz8** | `Bits::ctz8(n: u8) -> u8` | Returns the number of trailing zero bits in `n`. |
| **ctz16** | `Bits::ctz16(n: u16) -> u16` | Returns the number of trailing zero bits in `n`. |
| **ctz32** | `Bits::ctz32(n: u32) -> u32` | Returns the number of trailing zero bits in `n`. |
| **ctz64** | `Bits::ctz64(n: u64) -> u64` | Returns the number of trailing zero bits in `n`. |
| **ctz128** | `Bits::ctz128(n: u128) -> u128` | Returns the number of trailing zero bits in `n`. |

### Byte Swap (Endianness)

| Method | Signature | Description |
| :--- | :--- | :--- |
| **bswap16** | `Bits::bswap16(n: u16) -> u16` | Reverses the byte order of the integer `n`. |
| **bswap32** | `Bits::bswap32(n: u32) -> u32` | Reverses the byte order of the integer `n`. |
| **bswap64** | `Bits::bswap64(n: u64) -> u64` | Reverses the byte order of the integer `n`. |
| **bswap128** | `Bits::bswap128(n: u128) -> u128` | Reverses the byte order of the integer `n`. |

### Bit Reversal

| Method | Signature | Description |
| :--- | :--- | :--- |
| **reverse_bits8** | `Bits::reverse_bits8(n: u8) -> u8` | Reverses the order of bits in `n`. |
| **reverse_bits16** | `Bits::reverse_bits16(n: u16) -> u16` | Reverses the order of bits in `n`. |
| **reverse_bits32** | `Bits::reverse_bits32(n: u32) -> u32` | Reverses the order of bits in `n`. |
| **reverse_bits64** | `Bits::reverse_bits64(n: u64) -> u64` | Reverses the order of bits in `n`. |
| **reverse_bits128** | `Bits::reverse_bits128(n: u128) -> u128` | Reverses the order of bits in `n`. |
