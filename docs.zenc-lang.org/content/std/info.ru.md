+++
title = "std/sys/info"
+++

# std/sys/info

Модуль `std/sys/info` предоставляет утилиты для получения идентификации системы и информации о ней, являясь оболочкой для POSIX `uname`.

## Обзор

- **Идентификация системы**: Доступ к имени ОС, версии ядра, архитектуре оборудования и многому другому.
- **Соответствие RAII**: Структура `Uname` автоматически управляет памятью для своих внутренних строк.

## Использование

```zc
import "std/sys/info.zc"
import "std/io.zc"

fn main() {
    let info = SysInfo::get_uname();
    println "ОС: {info.sysname}";
    println "Ядро: {info.release}";
    println "Архитектура: {info.machine}";
}
```

## Определение структуры

### `Uname`
Содержит поля идентификации системы.
```zc
struct Uname {
    sysname: String;
    nodename: String;
    release: String;
    version: String;
    machine: String;
}
```

## Методы

### Методы `SysInfo`

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **get_uname** | `SysInfo::get_uname() -> Uname` | Возвращает структуру `Uname`, содержащую различные системные строки. |

## Управление памятью
- `Uname` реализует `impl Drop` и автоматически освобождает свои внутренние буферы `String`, когда выходит из области видимости.
