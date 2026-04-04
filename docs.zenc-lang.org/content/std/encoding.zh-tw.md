+++
title = "std/encoding"
+++

# std/encoding

`std/encoding` 模組提供了數據編碼和解碼工具。

## Base64 (`std/encoding/base64.zc`)

Base64 編碼實現 (RFC 4648)。

### 使用方法

```zc
import "std/encoding/base64.zc"

fn main() {
    let data = "Hello";
    let encoded = Base64::encode((u8*)data, 5);
    // encoded 為 "SGVsbG8="
}
```

### 方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **encode** | `Base64::encode(data: u8*, len: usize) -> char*` | 將數據編碼為 Base64 字串。 |
| **decode** | `Base64::decode(s: char*) -> Vec<u8>` | 將 Base64 字串解碼為原始位元組。 |

## Hex (`std/encoding/hex.zc`)

十六進位編碼與解碼。

### 使用方法

```zc
import "std/encoding/hex.zc"

fn main() {
    let data = "Zen";
    let encoded = Hex::encode((u8*)data, 3);
    // encoded 為 "5a656e"
}
```

### 方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **encode** | `Hex::encode(data: u8*, len: usize) -> String` | 將數據編碼為十六進位字串。 |
| **decode** | `Hex::decode(hex: String) -> Result<Vec<u8>>` | 將十六進位字串解碼為原始位元組。 |
