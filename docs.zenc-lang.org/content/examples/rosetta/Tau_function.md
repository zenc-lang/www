+++
title = "Tau function"
+++

# Tau function

```zc
fn divisor_count(n: int) -> int {
    let i = 1;
    let k = (n % 2 == 0) ? 1 : 2;
    let count = 0;
    while i * i <= n {
        if n % i == 0 {
            count++;
            let j = n / i;
            if j != i { count++; }
        }
        i += k;
    }
    return count;
}

fn main() {
    println "The number of divisors for the first 100 positive integers is:";
    for i in 1..=100 {
        print "{divisor_count(i):3d} ";
        if !(i % 10) { println ""; }
    }
}
```

**Output:**

```
The number of divisors for the first 100 positive integers is:
  1   2   2   3   2   4   2   4   3   4 
  2   6   2   4   4   5   2   6   2   6 
  4   4   2   8   3   4   4   6   2   8 
  2   6   4   4   4   9   2   4   4   8 
  2   8   2   6   6   4   2  10   3   6 
  4   6   2   8   4   8   4   4   2  12 
  2   4   6   7   4   8   2   6   4   8 
  2  12   2   4   6   6   4   8   2  10 
  5   4   2  12   4   4   4   8   2  12 
  4   6   4   4   4  12   2   6   6   9
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Tau function**](https://rosettacode.org/wiki/Tau_function) in Zen C.

*This article uses material from the Rosetta Code article **Tau function**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Tau_function?action=history).*
