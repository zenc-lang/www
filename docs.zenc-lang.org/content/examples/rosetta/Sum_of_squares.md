+++
title = "Sum of squares"
+++

# Sum of squares

```zc
import "std/vec.zc"

fn sum_squares<T>(vec: Vec<T>*) -> T {
    let sum: T = (T)0;
    for v in *vec { sum += v * v; }
    return sum;
}

fn main() {
    let vec = Vec<int>::new();
    println "{sum_squares<int>(&vec)}";
    vec << 2;
    vec << 3;
    vec << 5;
    println "{sum_squares<int>(&vec)}";

    let vec2 = Vec<f64>::new();
    vec2 << 2.5;
    vec2 << 3.5;
    vec2 << 5.5;
    println "{sum_squares<f64>(&vec2):g}";
}
```

**Output:**

```
0
38
48.75
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Sum of squares**](https://rosettacode.org/wiki/Sum_of_squares) in Zen C.

*This article uses material from the Rosetta Code article **Sum of squares**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Sum_of_squares?action=history).*
