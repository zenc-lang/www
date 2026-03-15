+++
title = "Bell numbers"
+++

# Bell numbers

```zc
import "std/bigint.zc"

fn main() {
    let a: BigInt[51];
    let bells: BigInt[51];
    
    a[0] = BigInt::from_int(1);
    bells[0] = BigInt::from_int(1);
    for i in 1..=50 {
        a[i] = BigInt::new();
        bells[i] = BigInt::new();
    }
    
    println "First 10 rows of the Bell Triangle\n1";
    
    for i in 1..=50 {
        let prev = (&a[0]).clone();
        a[0] = (&a[i - 1]).clone();
        bells[i] = (&a[0]).clone();
        
        let pr = i < 10;
        if pr { print "{a[0]} "; }
        
        for j in 1..=i {
            let next_val = (&a[j]).clone();
            a[j] = prev + &a[j-1];
            prev = next_val;
            
            if pr { print "{a[j]} "; }
        }
        if pr { println ""; }
    }
    
    println "\nFirst 15 Bell Numbers";
    for i in 0..15 { println "B({i}) = {bells[i]}"; }
    
    println "\n50th Bell Number";
    println "B(50) = {bells[50]}";
}
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Bell numbers**](https://rosettacode.org/wiki/Bell_numbers) in Zen C.

*This article uses material from the Rosetta Code article **Bell numbers**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Bell_numbers?action=history).*
