+++
title = "Case-sensitivity of identifiers"
+++

# Case-sensitivity of identifiers

Identifiers are case-sensitive in Zen C.

```zc
fn main() {
    let dog = "Benjamin";
    let Dog = "Samba";
    let DOG = "Bernie";
    println "The three dogs are named {dog}, {Dog} and {DOG}.";
}
```

**Output:**

```
The three dogs are named Benjamin, Samba and Bernie.
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Case-sensitivity of identifiers**](https://rosettacode.org/wiki/Case-sensitivity_of_identifiers) in Zen C.

*This article uses material from the Rosetta Code article **Case-sensitivity of identifiers**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Case-sensitivity_of_identifiers?action=history).*
