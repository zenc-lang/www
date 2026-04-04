+++
title = "std/encoding/hex"
+++

# std/encoding/hex

`std/encoding/hex` 模块提供了用于数据十六进制编码与解码的工具。

## 概览

- **编码**：将原始字节转换为十六进制字符串。
- **解码**：将十六进制字符串转换回原始字节 (`Vec<u8>`)。

## 使用方法

```zc
import "std/encoding/hex.zc"
import "std/io.zc"

fn main() {
    let data = "Hello";
    let encoded = Hex::encode((u8*)data, 5);
    println "十六进制: {encoded}"; // 48656c6c6f
    
    let decoded_res = Hex::decode(encoded);
    if (decoded_res.is_ok()) {
        let bytes = decoded_res.unwrap();
        // 使用字节数据...
    }
}
```

## 结构体定义

```zc
struct Hex {}
```

## 方法

### `Hex` 方法

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **encode** | `Hex::encode(data: u8*, len: usize) -> String` | 将原始数据编码为十六进制字符串。 |
| **decode** | `Hex::decode(hex: String) -> Result<Vec<u8>>` | 将十六进制字符串解码为 `Vec<u8>`。 |
