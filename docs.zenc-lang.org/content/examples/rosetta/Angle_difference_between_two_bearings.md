+++
title = "Angle difference between two bearings"
+++

# Angle difference between two bearings

```zc
import "std/math.zc"

fn subtract(b1: f64, b2: f64) -> f64 {
    let d = Math::mod(b2 - b1, 360.0);
    if d < -180.0 {
        d += 360.0;
    } else if d >= 180.0 {
        d -= 360.0;
    }
    return d;
}

fn main() {
    let pairs: (f64, f64)[12] = [
        ( 20.0,  45.0),
        (-45.0,  45.0),
        (-85.0,  90.0),
        (-95.0,  90.0),
        (-45.0, 125.0),
        (-45.0, 145.0),
        ( 29.4803, -88.6381),
        (-78.3251, -159.036),
        (-70099.74233810938, 29840.67437876723),
        (-165313.6666297357, 33693.9894517456),
        (1174.8380510598456, -154146.66490124757),
        (60175.77306795546, 42213.07192354373)
    ];

    "Differences (to 4dp) between these bearings:";
    for pair in pairs {
        let (p0, p1) = pair;
        let diff = subtract(p0, p1);
        "{p0:12.4f}° and {p1:12.4f}° -> {diff:9.4f}°";
    }
}
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Angle difference between two bearings**](https://rosettacode.org/wiki/Angle_difference_between_two_bearings) in Zen C.

*This article uses material from the Rosetta Code article **Angle difference between two bearings**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Angle_difference_between_two_bearings?action=history).*
