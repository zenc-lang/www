+++
title = "std/crypto"
+++

# std/crypto

`std/crypto` 模块提供加密原语和哈希算法。

## SHA1 (`std/crypto/sha1.zc`)

SHA1 哈希算法的实现。

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

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **hash** | `Sha1::hash(data: u8*, len: usize) -> Sha1` | 计算给定数据的 SHA1 哈希值。 |

## SHA256 (`std/crypto/sha256.zc`)

现代 SHA-256 哈希算法的实现 (FIPS 180-4)。

### 使用方法

```zc
import "std/crypto/sha256.zc"

fn main() {
    let hash = Sha256::hash("hello world");
    // hash 是十六进制字符串
}
```

### 方法

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **hash** | `Sha256::hash(data: char*) -> String` | 计算给定字符串的 SHA-256 哈希值，并将其作为十六进制字符串返回。 |
