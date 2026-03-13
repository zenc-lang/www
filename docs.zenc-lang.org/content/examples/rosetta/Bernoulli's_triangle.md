+++
title = "Bernoulli's triangle"
+++

# Bernoulli's triangle

```zc
fn main() {
    let rows = 15;
    let triangle: uint[15][15];

    for n in 0..rows {

        triangle[n][0] = 1;
 
        for k in 1..n {
            triangle[n][k] = triangle[n-1][k] + triangle[n-1][k-1];
        }
 
        if n > 0 {
            triangle[n][n] = 2 * triangle[n-1][n-1];
        }
    }

    // Print the triangle
    for n in 0..rows {
        for k in 0..=n {
            print "{triangle[n][k]} ";
        }
        println "";
    }
}
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Bernoulli's triangle**](https://rosettacode.org/wiki/Bernoulli's_triangle) in Zen C.

*This article uses material from the Rosetta Code article **Bernoulli's triangle**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Bernoulli's_triangle?action=history).*
