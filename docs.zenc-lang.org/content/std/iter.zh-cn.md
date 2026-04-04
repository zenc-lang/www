+++
title = "std/iter"
+++

# std/iter

`std/iter` 模块提供了用于定义自定义迭代器的 trait，使其与 Zen C 的 `for-in` 循环语法兼容。

## 使用方法

```zc
import "std/iter.zc"

fn main() {
    // 假设 my_collection 实现了 Iterable<T>
    for item in my_collection {
        // ...
    }
}
```

## Trait

### `Iterator<T>`

用于推进序列的接口。

```zc
trait Iterator<T> {
    fn next(self) -> Option<T>;
}
```

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **next** | `next(self) -> Option<T>` | 如果有下一个条目，则返回 `Some(item)`，如果迭代完成，则返回 `None`。 |

### `Iterable<T>`

用于产生 `Iterator` 的类型的接口。

```zc
trait Iterable<T> {
    fn iterator(self) -> Iterator<T>;
}
```

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **iterator** | `iterator(self) -> Iterator<T>` | 为集合创建并返回一个迭代器。 |
