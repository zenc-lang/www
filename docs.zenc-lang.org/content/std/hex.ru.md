+++
title = "std/encoding/hex"
+++

# std/encoding/hex

Модуль `std/encoding/hex` предоставляет утилиты для шестнадцатеричного кодирования и декодирования данных.

## Обзор

- **Кодирование**: Преобразование сырых байтов в шестнадцатеричную строку.
- **Декодирование**: Преобразование шестнадцатеричной строки обратно в сырые байты (`Vec<u8>`).

## Использование

```zc
import "std/encoding/hex.zc"
import "std/io.zc"

fn main() {
    let data = "Hello";
    let encoded = Hex::encode((u8*)data, 5);
    println "Hex: {encoded}"; // 48656c6c6f
    
    let decoded_res = Hex::decode(encoded);
    if (decoded_res.is_ok()) {
        let bytes = decoded_res.unwrap();
        // Используем байты...
    }
}
```

## Определение структуры

```zc
struct Hex {}
```

## Методы

### Методы `Hex`

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **encode** | `Hex::encode(data: u8*, len: usize) -> String` | Кодирует сырые данные в шестнадцатеричную строку. |
| **decode** | `Hex::decode(hex: String) -> Result<Vec<u8>>` | Декодирует шестнадцатеричную строку в `Vec<u8>`. |
