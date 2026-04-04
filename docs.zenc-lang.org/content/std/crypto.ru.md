+++
title = "std/crypto"
+++

# std/crypto

Модуль `std/crypto` предоставляет криптографические примитивы и алгоритмы хеширования.

## SHA1 (`std/crypto/sha1.zc`)

Реализация алгоритма хеширования SHA1.

### Использование

```zc
import "std/crypto/sha1.zc"

fn main() {
    let data = "Hello";
    let digest = Sha1::hash((u8*)data, 5);
    // digest.bytes - это u8[20]
}
```

### Методы

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **hash** | `Sha1::hash(data: u8*, len: usize) -> Sha1` | Вычисляет SHA1-хеш заданных данных. |

## SHA256 (`std/crypto/sha256.zc`)

Реализация современного алгоритма хеширования SHA-256 (FIPS 180-4).

### Использование

```zc
import "std/crypto/sha256.zc"

fn main() {
    let hash = Sha256::hash("hello world");
    // hash - это шестнадцатеричная строка
}
```

### Методы

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **hash** | `Sha256::hash(data: char*) -> String` | Вычисляет SHA-256 хеш заданной строки и возвращает его в виде Hex-строки. |
