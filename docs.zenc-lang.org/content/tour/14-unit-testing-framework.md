+++
title = "14. Unit Testing Framework"
weight = 14
+++

Zen C features a built-in testing framework that allows you to write unit tests directly in your source files using the `test` keyword.

#### Syntax
A `test` block contains a descriptive name and a body of code to execute. Tests do not require a `main` function to run.

```zc
test "unittest1" {
    "This is an unittest";

    let a = 3;
    assert(a > 0, "a should be a positive integer");

    "unittest1 passed.";
}
```

#### Running Tests
To run all tests in a file, use the `run` command. The compiler will automatically detect and execute all top-level `test` blocks.

```bash
zc run my_file.zc
```

#### Assertions
Use the built-in `assert(condition, message)` function to verify expectations. If the condition is false, the test will fail and print the provided message.
