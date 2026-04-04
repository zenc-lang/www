+++
title = "std/iter"
+++

# std/iter

`std/iter` 模組提供了特性（traits），用於定義與 Zen C 的 `for-in` 迴圈語法相容的自定義迭代器。

## 使用方法

```zc
import "std/iter.zc"

fn main() {
    // 假設 my_collection 實現了 Iterable<T>
    for item in my_collection {
        // ...
    }
}
```

## 特性 (Traits)

### `Iterator<T>`

用於在序列中前進的介面。

```zc
trait Iterator<T> {
    fn next(self) -> Option<T>;
}
```

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **next** | `next(self) -> Option<T>` | 如果有下一個項目則返回 `Some(item)`，如果迭代完成則返回 `None`。 |

### `Iterable<T>`

用於可以產生 `Iterator` 的類型的介面。

```zc
trait Iterable<T> {
    fn iterator(self) -> Iterator<T>;
}
```

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **iterator** | `iterator(self) -> Iterator<T>` | 為集合建立並返回一個迭代器。 |
