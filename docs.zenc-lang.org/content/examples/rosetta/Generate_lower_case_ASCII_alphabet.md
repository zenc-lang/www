+++
title = "Generate lower case ASCII alphabet"
+++

# Generate lower case ASCII alphabet

```zc
import "std/string.zc"

fn main() {
    let letters = String::from("");
    for r in 'a'..= 'z' { letters.push_rune(r) };
    println "{letters.c_str()}";
}
```

**Output:**

```
abcdefghijklmnopqrstuvwxyz
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Generate lower case ASCII alphabet**](https://rosettacode.org/wiki/Generate_lower_case_ASCII_alphabet) in Zen C.

*This article uses material from the Rosetta Code article **Generate lower case ASCII alphabet**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Generate_lower_case_ASCII_alphabet?action=history).*
