+++
title = "FizzBuzz"
+++

# FizzBuzz

```zc
fn main() {
    for i in 1..=100 {
        if i % 15 == 0 {
            println "FizzBuzz";
        } else if i % 3 == 0 {
            println "Fizz";
        } else if i % 5 == 0 {
            println "Buzz";
        } else {
            println "{i}";
        }
    }
}
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**FizzBuzz**](https://rosettacode.org/wiki/FizzBuzz) in Zen C.

*This article uses material from the Rosetta Code article **FizzBuzz**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/FizzBuzz?action=history).*
