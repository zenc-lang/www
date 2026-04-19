+++
title = "Null object"
+++

# Null object

As in standard C, Zen C has the concept of a null pointer and represents it with the NULL macro which generally evaluates to: (void*)0. Consequently, it can be cast (or implicitly converted) to a pointer of any other type and is treated as 'false' when used in boolean expressions.

```zc
fn main() {
	let object = (void*)0;

	if object == NULL {
	    println "object is null";
    }

    if !object {
        println "that's right!";
    }
}
```

**Output:**

```
object is null
that's right!
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Null object**](https://rosettacode.org/wiki/Null_object) in Zen C.

*This article uses material from the Rosetta Code article **Null object**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Null_object?action=history).*
