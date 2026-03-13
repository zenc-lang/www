+++
title = "Factorial"
+++

# Factorial

```zc
fn factorial(n: i64) -> i64 {
    // Using a ternary operator for the base case
    return n <= 1 ? 1 : n * factorial(n - 1);
}

fn main() {
    for i in 0..=15 {
        let res = factorial(i);
        println "{i}! = {res}";
    }
}
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Factorial**](https://rosettacode.org/wiki/Factorial) in Zen C.

*This article uses material from the Rosetta Code article **Factorial**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Factorial?action=history).*
