+++
title = "std/encoding/hex"
+++

# std/encoding/hex

`std/encoding/hex` 模組提供了用於數據十六進位編碼和解碼的工具。

## 概覽

- **編碼**：將原始位元組轉換為十六進位字串。
- **解碼**：將十六進位字串轉換回原始位元組 (`Vec<u8>`)。

## 使用方法

```zc
import "std/encoding/hex.zc"
import "std/io.zc"

fn main() {
    let data = "Hello";
    let encoded = Hex::encode((u8*)data, 5);
    println "十六進位: {encoded}"; // 48656c6c6f
    
    let decoded_res = Hex::decode(encoded);
    if (decoded_res.is_ok()) {
        let bytes = decoded_res.unwrap();
        // 使用 bytes...
    }
}
```

## 結構體定義

```zc
struct Hex {}
```

## 方法

### `Hex` 方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **encode** | `Hex::encode(data: u8*, len: usize) -> String` | 將原始數據編碼為十六進位字串。 |
| **decode** | `Hex::decode(hex: String) -> Result<Vec<u8>>` | 將十六進位字串解碼為 `Vec<u8>`。 |
