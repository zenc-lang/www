+++
title = "std/regex"
+++

# std/regex

Модуль `std/regex` обеспечивает поддержку регулярных выражений на основе POSIX `regex.h`.

## Использование

```zc
import "std/regex.zc"

fn main() {
    if regex_match("^[a-z]+$", "hello") {
        println "Совпадение!";
    }
    
    let re = Regex::compile("\\d+");
    let count = re.count("123 abc 456");
    re.destroy();
}
```

## Определения структур

### `Regex`

Представляет скомпилированное регулярное выражение.

```zc
struct Regex {
    // Внутренние дескрипторы
}
```

### `Match`

Представляет успешное совпадение регулярного выражения.

```zc
struct Match {
    text: char*;
    start: int;
    len: int;
}
```

## Методы

### Создание Regex

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **compile** | `Regex::compile(pattern: char*) -> Regex` | Компилирует шаблон регулярного выражения с флагами по умолчанию. |
| **compile_with_flags** | `Regex::compile_with_flags(pattern: char*, flags: int) -> Regex` | Компилирует с пользовательскими флагами POSIX. |
| **destroy** | `destroy(self)` | Освобождает скомпилированное регулярное выражение. |

### Сопоставление и поиск

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **match** | `match(self, text: char*) -> bool` | Возвращает true, если шаблон совпадает в любом месте `text`. |
| **find** | `find(self, text: char*) -> Option<Match>` | Возвращает первое совпадение, включая позицию и длину. |
| **count** | `count(self, text: char*) -> int` | Возвращает количество непересекающихся совпадений. |
| **split** | `split(self, text: char*) -> Vec<String>` | Разделяет текст по шаблону. |

### Доступ к совпадению

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **as_string** | `as_string(self) -> char*` | Возвращает указатель на начало совпадения. |
| **end** | `end(self) -> int` | Возвращает индекс после последнего символа совпадения. |

### Статические вспомогательные функции

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **regex_match** | `regex_match(pattern: char*, text: char*) -> bool` | Быстрая проверка на совпадение. |
| **regex_find** | `regex_find(pattern: char*, text: char*) -> Option<Match>` | Найти первое совпадение. |
| **regex_count** | `regex_count(pattern: char*, text: char*) -> int` | Подсчитать все совпадения. |
| **regex_split** | `regex_split(pattern: char*, text: char*) -> Vec<String>` | Разделить текст по шаблону. |
