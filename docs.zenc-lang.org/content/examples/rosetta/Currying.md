+++
title = "Currying"
+++

# Currying



```zc
alias fi = fn(int) -> int;

fn add_n(n: int) -> fi {
    return fn(x: int) -> int { return n + x; }
}

fn main() {
    let adder = add_n(40);
    println "The answer to life is {adder(2)}.";
}
```

**Output:**

```
The answer to life is 42.
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Currying**](https://rosettacode.org/wiki/Currying) in Zen C.

*This article uses material from the Rosetta Code article **Currying**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Currying?action=history).*
