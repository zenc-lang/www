# Standard Library: UTF-8 Utilities (`std/utf8.zc`)

The `std/utf8` module provides utilities for working with Unicode code points (`rune` type) and UTF-8 encoding.

## Usage

```zc
import "std/utf8.zc"

fn main() {
    let r = 'ñ';
    
    if (Utf8::is_alpha(r)) {
        println "{r} is a letter";
    }
    
    let upper = Utf8::to_upper(r);
    println "Uppercase: {upper}"; // Ñ
}
```

## Functions

| Function | Signature | Description |
| :--- | :--- | :--- |
| **is_digit** | `is_digit(r: rune) -> bool` | Returns true if the rune is a decimal digit (0-9). |
| **is_alpha** | `is_alpha(r: rune) -> bool` | Returns true if the rune is an alphabetic character (supports Latin-1). |
| **is_whitespace** | `is_whitespace(r: rune) -> bool` | Returns true if the rune is a whitespace character. |
| **is_upper** | `is_upper(r: rune) -> bool` | Returns true if the rune is an uppercase letter. |
| **is_lower** | `is_lower(r: rune) -> bool` | Returns true if the rune is a lowercase letter. |
| **to_upper** | `to_upper(r: rune) -> rune` | Returns the uppercase version of the rune. |
| **to_lower** | `to_lower(r: rune) -> rune` | Returns the lowercase version of the rune. |
| **encode** | `encode(r: rune, buf: char*) -> usize` | Encodes a rune into a UTF-8 byte sequence in `buf`. Returns number of bytes written (1-4). |
| **rune_len** | `rune_len(r: rune) -> usize` | Returns the number of bytes required to encode the given rune in UTF-8. |
| **is_valid** | `is_valid(data: char*, len: usize) -> bool` | Returns true if the buffer contains valid UTF-8 data. |
| **decode** | `decode(data: char*, len: usize, consumed: usize*) -> rune` | Decodes the first UTF-8 sequence from `data`. Sets `consumed` to the number of bytes read. |
