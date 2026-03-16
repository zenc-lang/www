+++
title = "Loops/Do-while"
+++

# Loops/Do-while

Although not documented as part of Zen C itself, C's do / while loop still works.

```zc
fn main() {
    let v = 0;
    do {
       "{++v}";
    } while v % 6;
}
```

**Output:**

```
1
2
3
4
5
6
```

Alternatively, we can simulate it by using Zen C's 'loop' statement (an infinite loop) with an explicit break at the end of the block.
The output is, of course, the same as before.

```zc
fn main() {
    let v = 0;
    loop {
        "{++v}";
        if !(v % 6) { break; }
    }
}
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Loops/Do-while**](https://rosettacode.org/wiki/Loops/Do-while) in Zen C.

*This article uses material from the Rosetta Code article **Loops/Do-while**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Loops/Do-while?action=history).*
