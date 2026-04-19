+++
title = "Narcissistic decimal number"
+++

# Narcissistic decimal number



```zc
import "std/vec.zc"

fn narc(n: int) -> Vec<int> {
    let power: [int; 10];
    for i in 0..10 { power[i] = i; }
    let limit = 10;
    let res = Vec<int>::new();
    for let x = 0; res.length() < n; ++x {
        if x >= limit {
            for i in 0..10 { power[i] *= i; }
            limit *= 10;
        }
        let sum = 0;
        let xx = x;
        while xx > 0 {
            sum += power[xx % 10];
            xx /= 10;
        }
        if sum == x { res << x; }
    }
    return res;
}

fn main() {
    println "The first 25 narcissistic decimal numbers are:"
    let res = narc(25);
    for n in res {
        print "{n} ";
    }
    println "";
}
```

**Output:**

```
The first 25 narcissistic decimal numbers are:
0 1 2 3 4 5 6 7 8 9 153 370 371 407 1634 8208 9474 54748 92727 93084 548834 1741725 4210818 9800817 9926315
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Narcissistic decimal number**](https://rosettacode.org/wiki/Narcissistic_decimal_number) in Zen C.

*This article uses material from the Rosetta Code article **Narcissistic decimal number**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Narcissistic_decimal_number?action=history).*
