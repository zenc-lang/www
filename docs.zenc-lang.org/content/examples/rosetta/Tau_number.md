+++
title = "Tau number"
+++

# Tau number

```zc
import "locale.h"

fn divisor_count(n: int) -> int {
    let i = 1;
    let k = (n % 2 == 0) ? 1 : 2;
    let count = 0;
    while i * i <= n {
        if n % i == 0 {
            count++;
            let j = n / i;
            if j != i { count++; }
        }
        i += k;
    }
    return count;
}

fn main() {
    setlocale(LC_NUMERIC, "en_US.UTF-8");
    println "The first 100 Tau numbers are:";
    let count = 0;
    for let i = 1; count < 100; ++i {
        if !(i % divisor_count(i)) {
            print "{i:'5d}  ";
            if !(++count % 10) { println ""; }
        }
    }
}
```

**Output:**

```
The first 100 Tau numbers are:
    1      2      8      9     12     18     24     36     40     56  
   60     72     80     84     88     96    104    108    128    132  
  136    152    156    180    184    204    225    228    232    240  
  248    252    276    288    296    328    344    348    360    372  
  376    384    396    424    441    444    448    450    468    472  
  480    488    492    504    516    536    560    564    568    584  
  600    612    625    632    636    640    664    672    684    708  
  712    720    732    776    792    804    808    824    828    852  
  856    864    872    876    880    882    896    904    936    948  
  972    996  1,016  1,040  1,044  1,048  1,056  1,068  1,089  1,096
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Tau number**](https://rosettacode.org/wiki/Tau_number) in Zen C.

*This article uses material from the Rosetta Code article **Tau number**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Tau_number?action=history).*
