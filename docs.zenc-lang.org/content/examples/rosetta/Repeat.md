+++
title = "Repeat"
+++

# Repeat

```zc
// The procedure accepts a standard closure and an integer
fn times(proc: fn(), n: uint) {
    for _ in 0..n {
        proc();
    }
}

fn main() {
    times(fn() { 
        println "Hello from closure!"; 
    }, 3);
}
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Repeat**](https://rosettacode.org/wiki/Repeat) in Zen C.

*This article uses material from the Rosetta Code article **Repeat**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Repeat?action=history).*
