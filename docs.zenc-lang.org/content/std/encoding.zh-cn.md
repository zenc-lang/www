+++
title = "std/encoding"
+++

# std/encoding

`std/encoding` 模块提供数据编码和解码工具。

## Base64 (`std/encoding/base64.zc`)

Base64 编码实现 (RFC 4648)。

### 使用方法

```zc
import "std/encoding/base64.zc"

fn main() {
    let data = "Hello";
    let encoded = Base64::encode((u8*)data, 5);
    // encoded 为 "SGVsbG8="
}
```

### 方法

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **encode** | `Base64::encode(data: u8*, len: usize) -> char*` | 将数据编码为 Base64 字符串。 |
| **decode** | `Base64::decode(s: char*) -> Vec<u8>` | 将 Base64 字符串解码为原始字节。 |

## Hex (`std/encoding/hex.zc`)

十六进制编码与解码。

### 使用方法

```zc
import "std/encoding/hex.zc"

fn main() {
    let data = "Zen";
    let encoded = Hex::encode((u8*)data, 3);
    // encoded 为 "5a656e"
}
```

### 方法

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **encode** | `Hex::encode(data: u8*, len: usize) -> String` | 将数据编码为十六进制字符串。 |
| **decode** | `Hex::decode(hex: String) -> Result<Vec<u8>>` | 将十六进制字符串解码为原始字节。 |
