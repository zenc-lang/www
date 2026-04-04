+++
title = "std/string"
+++

# std/string

`String` - это расширяемый строковый тип, выделяемый в куче. Он оборачивает `Vec<char>` и обеспечивает завершающий нуль для совместимости с C.

## Использование

```zc
import "std/string.zc"

fn main() {
    let s = String::from("Привет");

    // Для добавления требуется указатель на другую строку String
    let part = String::from(" Мир");
    s.append(&part);
    
    // Итерация (с учетом UTF-8)
    for c in s {
        println "{c}";
    }

    // Используйте c_str() для вывода
    println "{s.c_str()}"; // Выводит "Привет Мир"
    
    if (s.starts_with("Привет")) {
        // ...
    }
} // s освобождается здесь автоматически
```

## Определение структуры

```zc
struct String {
    vec: Vec<char>;
}
```

## Методы

### Конструирование

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **new** | `String::new(s: char*) -> String` | Создает новую строку из примитива C-строки. |
| **from** | `String::from(s: char*) -> String` | Псевдоним для `new`. |
| **from_rune** | `String::from_rune(r: rune) -> String` | Создает новую строку из одной руны (`rune`). |
| **from_runes** | `String::from_runes(runes: rune*, count: usize) -> String` | Создает новую строку из массива рун. |
| **from_runes_vec** | `String::from_runes_vec(runes: Vec<rune>) -> String` | Создает новую строку из вектора объектов `rune`. |

### Модификация

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **append** | `append(self, other: String*)` | Добавляет другую строку к текущей. |
| **append_c** | `append_c(self, s: char*)` | Добавляет литерал C-строки. |
| **push_rune** | `push_rune(self, r: rune)` | Добавляет одну кодовую точку Unicode (`rune`) к строке. |
| **insert_rune** | `insert_rune(self, idx: usize, r: rune)` | Вставляет руну по указанному *индексу символа*. |
| **remove_rune_at** | `remove_rune_at(self, idx: usize) -> rune` | Удаляет и возвращает руну по указанному *индексу символа*. |
| **reserve** | `reserve(self, cap: usize)` | Гарантирует, что строка имеет емкость как минимум для `cap` символов. |
| **clear** | `clear(self)` | Очищает строку. |

### Доступ и запросы

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **c_str** | `c_str(self) -> char*` | Возвращает указатель на подлежащую C-строку. |
| **length** | `length(self) -> usize` | Возвращает длину строки (исключая завершающий нуль). |
| **is_empty** | `is_empty(self) -> bool` | Возвращает true, если длина равна 0. |
| **to_string** | `to_string(self) -> char*` | Сопоставляется с `c_str()`. Используется для интерполяции `{var}`. |
| **starts_with** | `starts_with(self, prefix: char*) -> bool` | Проверяет, начинается ли строка с заданного префикса. |
| **ends_with** | `ends_with(self, suffix: char*) -> bool` | Проверяет, заканчивается ли строка заданным суффиксом. |
| **contains** | `contains(self, target: char) -> bool` | Проверяет, содержит ли строка заданный символ. |
| **contains_str** | `contains_str(self, target: char*) -> bool` | Проверяет, содержит ли строка заданную подстроку. |
| **find** | `find(self, target: char) -> Option<usize>` | Возвращает индекс первого вхождения байта `target`. |
| **find_str** | `find_str(self, target: char*) -> Option<usize>` | Возвращает индекс первого вхождения подстроки `target`. |
| **find_all_str** | `find_all_str(self, target: char*) -> Vec<usize>` | Возвращает вектор со всеми индексами, по которым встречается `target`. |
| **substring** | `substring(self, start: usize, len: usize) -> String` | Возвращает новую строку, содержащую указанную подстроку. |

### Поддержка UTF-8

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **utf8_len** | `utf8_len(self) -> usize` | Возвращает количество кодовых точек Unicode (символов). |
| **utf8_at** | `utf8_at(self, idx: usize) -> String` | Возвращает символ по указанному индексу как новую строку. |
| **utf8_get** | `utf8_get(self, idx: usize) -> rune" | Возвращает символ по указанному индексу как `rune`. |
| **utf8_substr** | `utf8_substr(self, start_idx: usize, num_chars: usize) -> String` | Возвращает подстроку на основе индексов символов. |
| **runes** | `runes(self) -> Vec<rune>` | Возвращает вектор, содержащий все кодовые точки Unicode. |
| **chars** | `chars(self) -> StringCharsIter` | Возвращает итератор, выдающий `Option<rune>`. |

### Преобразования

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **to_lowercase** | `to_lowercase(self) -> String` | Возвращает новую строку, преобразованную в нижний регистр. |
| **to_uppercase** | `to_uppercase(self) -> String` | Возвращает новую строку, преобразованную в верхний регистр. |
| **split** | `split(self, delim: char) -> Vec<String>` | Разделяет строку на вектор подстрок. |
| **trim** | `trim(self) -> String` | Возвращает новую строку с удаленными начальными и конечными пробелами. |
| **replace** | `replace(self, target: char*, replacement: char*) -> String` | Возвращает новую строку с выполненными заменами. |
| **pad_left** | `pad_left(self, target_len: usize, pad_char: char) -> String` | Возвращает новую строку с заполнением слева. |
| **pad_right** | `pad_right(self, target_len: usize, pad_char: char) -> String` | Возвращает новую строку с заполнением справа. |

### Сравнение

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **eq** | `eq(self, other: String*) -> bool` | Проверка структурного равенства. |
| **neq** | `neq(self, other: String*) -> bool` | Проверка структурного неравенства. |
| **compare** | `compare(self, other: String*) -> int` | Лексическое сравнение. |
| **compare_ignore_case** | `compare_ignore_case(self, other: String*) -> int` | Лексическое сравнение без учета регистра. |
| **eq_ignore_case** | `eq_ignore_case(self, other: String*) -> bool` | Проверка равенства без учета регистра. |

## Операторы

| Оператор | Метод | Описание |
| :--- | :--- | :--- |
| `+` | **add** | `s1 + &s2`. Конкатенация строк в новую строку `String`. |
| `+=` | **add_assign** | `s1 += &s2`. Добавление `s2` к `s1` на месте. |
| `==` | **eq** | `s1 == &s2`. Проверка структурного равенства. |
| `!=` | **neq** | `s1 != &s2`. Проверка структурного неравенства. |
| `<` | **lt** | `s1 < &s2`. Лексическое сравнение. |
| `>` | **gt** | `s1 > &s2`. Лексическое сравнение. |
| `<=` | **le** | `s1 <= &s2`. Лексическое сравнение. |
| `>=` | **ge** | `s1 >= &s2`. Лексическое сравнение. |
| `{}` | **to_string** | Используется для интерполяции в `printf`/`println`. |

## Итерация

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **iterator** | `iterator(self) -> StringCharsIter` | Возвращает итератор, выдающий `rune`. Используется в `for c in s`. |

## Управление памятью

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **free** | `free(self)` | Вручную освобождает память строки. |
| **destroy** | `destroy(self)` | Псевдоним для `free`. |
| **forget** | `forget(self)` | Предотвращает автоматическое освобождение (передача владения). |
| **Trait** | `impl Drop for String` | Автоматически вызывает `free()`, когда объект выходит из области видимости. |
