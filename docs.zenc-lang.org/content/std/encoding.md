# Encoding (`std/encoding/`)

Data encoding and decoding utilities.

## Base64 (`std/encoding/base64.zc`)

Base64 encoding (RFC 4648).

### Usage

```zc
import "std/encoding/base64.zc"

let encoded = Base64::encode((u8*)"Hello", 5);
// encoded is "SGVsbG8="
```
