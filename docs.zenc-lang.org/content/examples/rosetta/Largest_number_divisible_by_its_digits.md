+++
title = "Largest number divisible by its digits"
+++

# Largest number divisible by its digits



### Base 10

```zc
import "std/set.zc"

fn are_digits_distinct(s: string) -> bool {
    let set = Set<int>::new();
    let len = strlen(s);
    for i in 0..len { set.add(s[i]); }
    return len == set.length();
}

fn is_div_by_all(n: int, s: string) -> bool {
    for i in 0..strlen(s) {
        if n % (s[i] - 48) { return false; }
    }
    return true;
}

fn main() {
    def MAGIC = 9 * 8 * 7;
    def HIGH  = 9876432 / MAGIC * MAGIC;
    for (let i = HIGH; i >= MAGIC; i -= MAGIC) {
        if !(i % 10) { continue; }  // can't end in '0'
        let s = "{i}";
        if strchr(s, '0') || strchr(s, '5') { // can't contain '0' or '5'
            continue;
        }
        if !are_digits_distinct(s) { continue; } // digits must be unique
        if is_div_by_all(i, s) {
            println "Largest decimal number is {i}.";
            break;
        }
    }
}
```

**Output:**

```
Largest decimal number is 9867312.
```

### Base 16

```zc
import "std/set.zc"

fn are_digits_distinct(s: string) -> bool {
    let set = Set<int>::new();
    let len = strlen(s);
    for i in 0..len { set.add(s[i]); }
    return len == set.length();
}

fn is_div_by_all(n: u64, s: string) -> bool {
    for i in 0..strlen(s) {
        let d: u64 = (s[i] <= '9') ? s[i] - '0' : s[i] - 'W'
        if n % d { return false; }
    }
    return true;
}

fn main() {
    def MAGIC: u64 = 15 * 14 * 13 * 12 * 11;
    def HIGH : u64 = (u64)0xfedcba987654321 / MAGIC * MAGIC;
    for (let i = HIGH; i >= MAGIC; i -= MAGIC) {
        if !(i % 16) { continue; }               // can't end in '0'
        let s = "{i:llx}";                       // always generates lower case a-f
        if strchr(s, '0') { continue; }          // can't contain '0'
        if !are_digits_distinct(s) { continue; } // digits must be unique
        if is_div_by_all(i, s) {
            println "Largest hex number is {i:llx}.";
            break;
        }
    }
}
```

**Output:**

```
Largest hex number is fedcb59726a1348.
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Largest number divisible by its digits**](https://rosettacode.org/wiki/Largest_number_divisible_by_its_digits) in Zen C.

*This article uses material from the Rosetta Code article **Largest number divisible by its digits**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Largest_number_divisible_by_its_digits?action=history).*
