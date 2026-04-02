# std/crypto

The `std/crypto` module provides cryptographic primitives and hashing algorithms.

## SHA1 (`std/crypto/sha1.zc`)

Implementation of the SHA1 hashing algorithm.

### Usage

```zc
import "std/crypto/sha1.zc"

fn main() {
    let data = "Hello";
    let digest = Sha1::hash((u8*)data, 5);
    // digest.bytes is u8[20]
}
```

### Methods

| Method | Signature | Description |
| :--- | :--- | :--- |
| **hash** | `Sha1::hash(data: u8*, len: usize) -> Sha1` | Computes the SHA1 hash of the given data. |

## SHA256 (`std/crypto/sha256.zc`)

Implementation of the modern SHA-256 hashing algorithm (FIPS 180-4).

### Usage

```zc
import "std/crypto/sha256.zc"

fn main() {
    let hash = Sha256::hash("hello world");
    // hash is hexadecimal string
}
```

### Methods

| Method | Signature | Description |
| :--- | :--- | :--- |
| **hash** | `Sha256::hash(data: char*) -> String` | Computes the SHA-256 hash of the given string and returns it as a Hex string. |
