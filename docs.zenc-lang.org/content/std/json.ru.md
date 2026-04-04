+++
title = "std/json"
+++

# std/json

Модуль `std/json` предоставляет реализацию парсера и конструктора JSON в стиле DOM для Zen-C. Он отличается простым API для создания, манипулирования и сериализации данных JSON с автоматическим управлением памятью.

## Обзор

- **Стиль DOM**: Иерархическая древовидная структура узлов `JsonValue`.
- **Типобезопасные методы доступа**: Проверка типов (`is_string`, `is_number`) и безопасное извлечение значений.
- **Автоматическая очистка**: Реализует трейт `Drop` для автоматического рекурсивного управления памятью.
- **Соответствие стандартам**: Поддерживает стандартные типы JSON, включая объекты, массивы, строки, числа, логические значения и null.

## Использование

```zc
import "std/json.zc"

fn main() {
    // Построение JSON
    let obj = JsonValue::object();
    obj.set("name", JsonValue::string("Alice"));
    obj.set("age", JsonValue::number(30.0));
    obj.set("active", JsonValue::bool(true));
    
    // Сериализация
    let json_str = obj.to_string();
    println "Сериализовано: {json_str}";
    
    // Парсинг
    let input = "{\"score\": 100}";
    match JsonValue::parse(input) {
        Ok(parsed) => {
            println "Счет: {parsed.get(\"score\").unwrap().as_int().unwrap()}";
            // parsed освобождается автоматически в конце этого блока
        }
        Err(e) => println "Ошибка: {e}"
    }
} // obj освобождается здесь автоматически
```

## Определение структуры

```zc
struct JsonValue {
    kind: JsonType;
    // ... внутренние поля
}
```

## Методы

### Конструирование

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **null** | `JsonValue::null() -> JsonValue` | Создает значение null. |
| **bool** | `JsonValue::bool(b: bool) -> JsonValue` | Создает логическое значение. |
| **number** | `JsonValue::number(n: double) -> JsonValue` | Создает числовое значение. |
| **string** | `JsonValue::string(s: char*) -> JsonValue` | Создает строковое значение. |
| **array** | `JsonValue::array() -> JsonValue` | Создает пустой массив JSON. |
| **object** | `JsonValue::object() -> JsonValue` | Создает пустой объект JSON. |

### Парсинг

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **parse** | `JsonValue::parse(json: char*) -> Result<JsonValue*>` | Парсит строку JSON в дерево, выделенное в куче. |

### Методы доступа

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **is_null** | `is_null(self) -> bool` | Возвращает true, если тип - null. |
| **is_bool** | `is_bool(self) -> bool` | Возвращает true, если тип - логический. |
| **is_number** | `is_number(self) -> bool` | Возвращает true, если тип - число. |
| **is_string** | `is_string(self) -> bool` | Возвращает true, если тип - строка. |
| **is_array** | `is_array(self) -> bool` | Возвращает true, если тип - массив. |
| **is_object** | `is_object(self) -> bool` | Возвращает true, если тип - объект. |
| **as_string** | `as_string(self) -> Option<char*>` | Возвращает указатель на строку, если применимо. |
| **as_int** | `as_int(self) -> Option<int>` | Возвращает целое значение, если применимо. |
| **as_float** | `as_float(self) -> Option<double>` | Возвращает числовое значение, если применимо. |
| **as_bool** | `as_bool(self) -> Option<bool>` | Возвращает логическое значение, если применимо. |

### Модификация

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **push** | `push(self, val: JsonValue)` | Добавляет дочернее значение в массив JSON. |
| **set** | `set(self, key: char*, val: JsonValue)` | Вставляет или обновляет пару ключ-значение в объекте JSON. |
| **get** | `get(self, key: char*) -> Option<JsonValue*>` | Получает дочернее значение из объекта по ключу. |
| **at** | `at(self, index: usize) -> Option<JsonValue*>` | Получает дочернее значение из массива по индексу. |

### Сериализация

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **to_string** | `to_string(self) -> String` | Возвращает сериализованную строку JSON. |

## Управление памятью

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **free** | `free(self)` | Рекурсивно освобождает значение и все дочерние узлы. |
| **Trait** | `impl Drop for JsonValue` | Автоматически запускает рекурсивный `free()` при выходе из области видимости. |
