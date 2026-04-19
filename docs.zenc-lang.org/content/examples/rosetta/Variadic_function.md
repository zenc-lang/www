+++
title = "Variadic function"
+++

# Variadic function

```zc
fn variadic(count: int, ...) {
    let args: va_list;
    va_start(args, count);
    for i in 0..count {
        println "{va_arg(args, string)}";
    }
    va_end(args);
}

fn main(argc: int, argv: char**) {
    // First print some hard-coded words.
    let words = ["faith", "hope", "charity"];
    variadic(3, words[0], words[1], words[2]);
    println "";

    // Now print the command line args if there's 3 of them,
    // plus the executable name (argv[0]).
    if argc == 4 {
        variadic(argc, argv[0], argv[1], argv[2], argv[3]);
    } else {
        eprintln "Please pass 3 command line arguments.";
    }
}
```

**Output:**

Sample session:

```
$ zc build Variadic_function.zc
   Compiling Variadic_function.zc
    Finished build in 0.05s
$ ./Variadic_function pip squeak wilfred
faith
hope
charity

./Variadic_function
pip
squeak
wilfred
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Variadic function**](https://rosettacode.org/wiki/Variadic_function) in Zen C.

*This article uses material from the Rosetta Code article **Variadic function**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Variadic_function?action=history).*
