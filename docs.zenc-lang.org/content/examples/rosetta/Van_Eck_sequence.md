+++
title = "Van Eck sequence"
+++

# Van Eck sequence



```zc
import "std/map.zc"

fn main() {
    def MAX = 1000;
    let a:[int; MAX];
    let seen = Map<int>::new();
    for n in 0..(MAX - 1) {
        let sn = "{a[n]}";
        if seen.contains(sn) {
            a[n + 1] = n - seen[sn].unwrap();
        }
        seen.put(sn, n);
    }
    println "The first ten terms of the Van Eck sequence are:";
    for i in 0..10 { print "{a[i]}, "; }
    println "\b\b \n";
    println "Terms 991 to 1000 of the sequence are:";
    for i in 990..1000 { print "{a[i]}, "; }
    println "\b\b \n";
}
```

**Output:**

```
The first ten terms of the Van Eck sequence are:
0, 0, 1, 0, 2, 0, 2, 2, 1, 6  

Terms 991 to 1000 of the sequence are:
4, 7, 30, 25, 67, 225, 488, 0, 10, 136
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Van Eck sequence**](https://rosettacode.org/wiki/Van_Eck_sequence) in Zen C.

*This article uses material from the Rosetta Code article **Van Eck sequence**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Van_Eck_sequence?action=history).*
