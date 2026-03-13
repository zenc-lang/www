+++
title = "User input/Text"
+++

# User input/Text

```zc
fn main() {
    let str_val: char[256];
    let int_val: int;
    
    // Prompt for the string (infers %s for the char array)
    ? "Enter a string: " (str_val);
    
    // Prompt for the integer (infers %d for the int)
    ? "Enter the integer 75000: " (int_val);
    
    println "\nYou entered the string: {str_val}";
    println "You entered the integer: {int_val}";
}
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**User input/Text**](https://rosettacode.org/wiki/User_input/Text) in Zen C.

*This article uses material from the Rosetta Code article **User input/Text**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/User_input/Text?action=history).*
