+++
title = "Fibonacci sequence"
+++

# Fibonacci sequence

```zc
// Recursive approach using pattern matching
fn fib_rec(n: int) -> int {
    match n {
        0 => { return 0; },
        1 => { return 1; },
        _ => { return fib_rec(n - 1) + fib_rec(n - 2); }
    }
}

// Iterative approach using exclusive range loops
fn fib_iter(n: int) -> int {
    let a = 0;
    let b = 1;
    
    // The loop variable is ignored using the '_' wildcard
    for _ in 0..<n {
        let next = a + b;
        a = b;
        b = next;
    }
    
    return a;
}

fn main() {
    println "Fibonacci Sequence (0 to 20):";
    
    println "\nRecursive:";
    for i in 0..=20 {
        let res = fib_rec(i);
        println "fib({i}) = {res}";
    }

    println "\nIterative:";
    for i in 0..=20 {
        let res = fib_iter(i);
        println "fib({i}) = {res}";
    }
}
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Fibonacci sequence**](https://rosettacode.org/wiki/Fibonacci_sequence) in Zen C.

*This article uses material from the Rosetta Code article **Fibonacci sequence**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Fibonacci_sequence?action=history).*
