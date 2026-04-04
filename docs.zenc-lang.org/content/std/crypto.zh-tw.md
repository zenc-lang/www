+++
title = "std/crypto"
+++

# std/crypto

`std/crypto` 模組提供了加密原語和雜湊（hashing）演算法。

## SHA1 (`std/crypto/sha1.zc`)

SHA1 雜湊演算法的實現。

### 使用方法

```zc
import "std/crypto/sha1.zc"

fn main() {
    let data = "Hello";
    let digest = Sha1::hash((u8*)data, 5);
    // digest.bytes 是 u8[20]
}
```

### 方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **hash** | `Sha1::hash(data: u8*, len: usize) -> Sha1` | 計算給定數據的 SHA1 雜湊值。 |

## SHA256 (`std/crypto/sha256.zc`)

現代 SHA-256 雜湊演算法的實現 (FIPS 180-4)。

### 使用方法

```zc
import "std/crypto/sha256.zc"

fn main() {
    let hash = Sha256::hash("hello world");
    // hash 是十六進位字串
}
```

### 方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **hash** | `Sha256::hash(data: char*) -> String` | 計算給定字串的 SHA-256 雜湊值，並將其作為十六進位字串返回。 |
