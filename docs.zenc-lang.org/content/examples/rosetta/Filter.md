+++
title = "Filter"
+++

# Filter

Filtering is usually best done using vectors rather than arrays but, as the task asks for the latter to be used, that's what we do. Note that empty arrays are not supported.

### New array

```zc
fn filter_array<T>(a: T*, b: T*, len: int*) {
    let ix = 0;
    for i in 0..*len {
        if !(a[i] % 2) { b[ix++] = a[i]; }
    }
    *len = ix;
}

fn main() {
    let a = [1, 2, 3, 4, 5, 6];
    let b: int* = malloc(a.len * sizeof(int));
    let new_len = a.len;
    filter_array<int>(a, b, &new_len);
    if new_len > 0 {
        // Reduce array size to fit filtered data. 
        // Note that 'realloc' will free 'b' automatically.
        autofree let c: int* = realloc(b, new_len * sizeof(int));     
        for i in 0..new_len {
            print "{c[i]}, ";
        }
        println "\b\b ";
    } else {
        println "No elements were filtered out.";
        free(b);
    }
}
```

**Output:**

```
2, 4, 6
```

### In place

Same output as before.

```zc
fn filter_array_in_place<T>(a: T*, len: int*) {
    let ix = 0;
    for i in 0..*len {
        if !(a[i] % 2) { a[ix++] = a[i]; }
    }
    *len = ix;
}

fn main() {
    let a = [1, 2, 3, 4, 5, 6];
    let old_len = a.len;
    let new_len = old_len;
    filter_array_in_place<int>(a, &new_len);

    // As 'realloc' may create a new array, we set the remaining
    // elements to 0 instead.
    for i in new_len..old_len { a[i] = 0; }
    for i in 0..new_len {
        print "{a[i]}, ";
    }
    println "\b\b ";
}
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Filter**](https://rosettacode.org/wiki/Filter) in Zen C.

*This article uses material from the Rosetta Code article **Filter**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Filter?action=history).*
