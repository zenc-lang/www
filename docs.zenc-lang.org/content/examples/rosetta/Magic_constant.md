+++
title = "Magic constant"
+++

# Magic constant

```zc
//> link: -lm

import "locale.h"
import "std/math.zc"
import "math.h" as c_math // for cbrt function

fn magic_constant(n: u64) -> u64 {
    return (n * n + 1) * n / 2;
}

fn main() {
    "First 20 magic constants:";
    for i in 3..=22 {
        let mc = magic_constant((u64)i);
        "{mc:5ld}"..;
        if i == 12 || i == 22 { println ""; }
    }

    setlocale(LC_NUMERIC, "en_US.UTF-8");
    "\n1,000th magic constant: {magic_constant(1002):'lu}";

    "\nSmallest order magic square with a constant greater than:"
    for i in 1..=20 {
        let goal = Math::pow(10.0, i);
        let order = (u64)(Math::floor(c_math::cbrt(goal * 2.0))) + 1;
        "10 ^ {i:2d} : {order:'9lu}";
    }
}
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Magic constant**](https://rosettacode.org/wiki/Magic_constant) in Zen C.

*This article uses material from the Rosetta Code article **Magic constant**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Magic_constant?action=history).*
