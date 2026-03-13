+++
title = "Array concatenation"
+++

# Array concatenation

```zc
fn main() {
    let a: int[3] = [1, 2, 3];
    let b: int[2] = [4, 5];
    
    let c: int[5]; 
    
    // Performant memory block copying for raw arrays
    memcpy(c, a, sizeof(int) * 3);
    // Offset by 3 integers to append 'b'
    memcpy((int*)c + 3, b, sizeof(int) * 2);
    
    print "Concatenated array: [";
    for let i = 0; i < 5; i += 1 {
        print "{c[i]}";
        if i < 4 {
            print ", ";
        }
    }
    println "]";
}
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Array concatenation**](https://rosettacode.org/wiki/Array_concatenation) in Zen C.

*This article uses material from the Rosetta Code article **Array concatenation**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Array_concatenation?action=history).*
