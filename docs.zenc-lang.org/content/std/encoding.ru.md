+++
title = "std/encoding"
+++

# std/encoding

Модуль `std/encoding` предоставляет утилиты для кодирования и декодирования данных.

## Base64 (`std/encoding/base64.zc`)

Реализация кодирования Base64 (RFC 4648).

### Использование

```zc
import "std/encoding/base64.zc"

fn main() {
    let data = "Hello";
    let encoded = Base64::encode((u8*)data, 5);
    // encoded - это "SGVsbG8="
}
```

### Методы

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **encode** | `Base64::encode(data: u8*, len: usize) -> char*` | Кодирует данные в строку Base64. |
| **decode** | `Base64::decode(s: char*) -> Vec<u8>` | Декодирует строку Base64 в сырые байты. |

## Hex (`std/encoding/hex.zc`)

Шестнадцатеричное кодирование и декодирование.

### Использование

```zc
import "std/encoding/hex.zc"

fn main() {
    let data = "Zen";
    let encoded = Hex::encode((u8*)data, 3);
    // encoded - это "5a656e"
}
```

### Методы

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **encode** | `Hex::encode(data: u8*, len: usize) -> String` | Кодирует данные в строку Hex. |
| **decode** | `Hex::decode(hex: String) -> Result<Vec<u8>>` | Декодирует строку Hex в сырые байты. |
