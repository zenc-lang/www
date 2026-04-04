+++
title = "std/iter"
+++

# std/iter

O módulo `std/iter` fornece traits para definir iteradores personalizados compatíveis com a sintaxe do loop `for-in` do Zen C.

## Uso

```zc
import "std/iter.zc"

fn main() {
    // Assumindo que my_collection implementa Iterable<T>
    for item in my_collection {
        // ...
    }
}
```

## Traits

### `Iterator<T>`

Uma interface para avançar através de uma sequência.

```zc
trait Iterator<T> {
    fn next(self) -> Option<T>;
}
```

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **next** | `next(self) -> Option<T>` | Retorna `Some(item)` se houver um próximo item, ou `None` se a iteração estiver concluída. |

### `Iterable<T>`

Uma interface para tipos que podem produzir um `Iterator`.

```zc
trait Iterable<T> {
    fn iterator(self) -> Iterator<T>;
}
```

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **iterator** | `iterator(self) -> Iterator<T>` | Cria e retorna um iterador para a coleção. |
