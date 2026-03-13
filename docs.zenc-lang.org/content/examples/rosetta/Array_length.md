+++
title = "Array length"
+++

# Array length

```zc
fn main() {
    let fruits: string[2] = ["apple", "orange"];
    
    // Calculate the number of elements using sizeof
    let count = sizeof(fruits) / sizeof(fruits[0]);
    
    println "Raw array length: {count}";
}
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Array length**](https://rosettacode.org/wiki/Array_length) in Zen C.

*This article uses material from the Rosetta Code article **Array length**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Array_length?action=history).*
