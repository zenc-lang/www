+++
title = "std/sys/stat"
+++

# std/sys/stat

Модуль `std/sys/stat` предоставляет интерфейс для получения расширенных метаданных файлов и информации о состоянии, оборачивая POSIX `sys/stat.h`.

## Обзор

- **File Metadata**: Retrieve file size, mode (permissions), and timestamps.
- **Timestamps**: Access access, modification, and change times as Unix timestamps.
- **Type Checking**: Helper methods to determine if a mode represents a file or directory.

## Использование

```zc
import "std/sys/stat.zc"
import "std/io.zc"

fn main() {
    let res = FileStat::stat("myfile.txt");
    if (res.is_some()) {
        let st = res.unwrap();
        println "Размер: {st.size} байт";
        println "Права доступа: {st.mode}";
        
        if (FileStat::is_dir(st.mode)) {
            println "Это директория.";
        }
    }
}
```

## Определение структуры

### `Stat`
Содержит метаданные файла в стиле Unix.
```zc
struct Stat {
    mode: u32;
    size: u64;
    atime: i64;
    mtime: i64;
    ctime: i64;
    uid: u32;
    gid: u32;
}
```

## Методы

### Методы `FileStat`

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **stat** | `FileStat::stat(path: char*) -> Option<Stat>` | Возвращает метаданные для заданного пути или `None` в случае ошибки. |
| **is_dir** | `FileStat::is_dir(mode: u32) -> bool` | Проверяет, представляет ли данный режим директорию. |
| **is_file** | `FileStat::is_file(mode: u32) -> bool" | Проверяет, представляет ли данный режим обычный файл. |
