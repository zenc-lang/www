+++
title = "std/iter"
+++

# std/iter

Модуль `std/iter` предоставляет трейты для определения пользовательских итераторов, совместимых с синтаксисом цикла `for-in` в Zen C.

## Использование

```zc
import "std/iter.zc"

fn main() {
    // Предполагая, что my_collection реализует Iterable<T>
    for item in my_collection {
        // ...
    }
}
```

## Трейты

### `Iterator<T>`

Интерфейс для продвижения по последовательности.

```zc
trait Iterator<T> {
    fn next(self) -> Option<T>;
}
```

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **next** | `next(self) -> Option<T>` | Возвращает `Some(item)`, если есть следующий элемент, или `None`, если итерация завершена. |

### `Iterable<T>`

Интерфейс для типов, которые могут создавать `Iterator`.

```zc
trait Iterable<T> {
    fn iterator(self) -> Iterator<T>;
}
```

| Метод | Сигнатура | Описание |
| :--- | :--- | :--- |
| **iterator** | `iterator(self) -> Iterator<T>` | Создает и возвращает итератор для коллекции. |
