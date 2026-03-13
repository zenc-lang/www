+++
title = "Ackermann function"
+++

# Ackermann function

```zc
fn ackermann(m: int, n: int) -> int {
    if m == 0 {
        return n + 1;
    }
    if m > 0 && n == 0 {
        return ackermann(m - 1, 1);
    }
    return ackermann(m - 1, ackermann(m, n - 1));
}

fn main() {
    // Test the function for small values... 
    for let m = 0; m <= 3; m += 1 {
        for let n = 0; n <= 4; n += 1 {
            let a = ackermann(m, n);
            println "A({m}, {n}) = {a}";
        }
    }
}
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Ackermann function**](https://rosettacode.org/wiki/Ackermann_function) in Zen C.

*This article uses material from the Rosetta Code article **Ackermann function**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Ackermann_function?action=history).*
