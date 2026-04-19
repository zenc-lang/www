+++
title = "Call an object method"
+++

# Call an object method

```zc
struct MyStruct {}

impl MyStruct {
    fn static_method() {
        println "static method called";
    }

    fn method(self) {
        println "instance method called";
    }
}

fn main() {
    let mc = MyStruct{};
    mc.method();
    MyStruct::static_method();
}
```

**Output:**

```
instance method called
static method called
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Call an object method**](https://rosettacode.org/wiki/Call_an_object_method) in Zen C.

*This article uses material from the Rosetta Code article **Call an object method**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Call_an_object_method?action=history).*
