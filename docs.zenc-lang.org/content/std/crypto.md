# Crypto (`std/crypto/`)

Cryptographic primitives.

## SHA1 (`std/crypto/sha1.zc`)

Implementation of the SHA1 hashing algorithm.

### Usage

```zc
import "std/crypto/sha1.zc"

let digest = Sha1::hash((u8*)"Hello", 5);
// digest.bytes is u8[20]
```
