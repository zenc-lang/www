# std/encoding/hex

The `std/encoding/hex` module provides utilities for hexadecimal encoding and decoding of data.

## Overview

- **Encoding**: Convert raw bytes into a hexadecimal string.
- **Decoding**: Convert a hexadecimal string back into raw bytes (`Vec<u8>`).

## Usage

```zc
import "std/encoding/hex.zc"
import "std/io.zc"

fn main() {
    let data = "Hello";
    let encoded = Hex::encode((u8*)data, 5);
    println "Hex: {encoded}"; // 48656c6c6f
    
    let decoded_res = Hex::decode(encoded);
    if (decoded_res.is_ok()) {
        let bytes = decoded_res.unwrap();
        // Use bytes...
    }
}
```

## Struct Definition

```zc
struct Hex {}
```

## Methods

### `Hex` Methods

| Method | Signature | Description |
| :--- | :--- | :--- |
| **encode** | `Hex::encode(data: u8*, len: usize) -> String` | Encodes raw data into a hexadecimal string. |
| **decode** | `Hex::decode(hex: String) -> Result<Vec<u8>>` | Decodes a hexadecimal string into a `Vec<u8>`. |
