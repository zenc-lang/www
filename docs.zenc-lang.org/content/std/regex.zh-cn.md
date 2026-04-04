+++
title = "std/regex"
+++

# std/regex

`std/regex` 模块提供基于 POSIX `regex.h` 的正则表达式支持。

## 使用方法

```zc
import "std/regex.zc"

fn main() {
    if regex_match("^[a-z]+$", "hello") {
        println "匹配成功!";
    }
    
    let re = Regex::compile("\\d+");
    let count = re.count("123 abc 456");
    re.destroy();
}
```

## 结构体定义

### `Regex`

表示一个已编译的正则表达式。

```zc
struct Regex {
    // 内部句柄
}
```

### `Match`

表示一次成功的正则匹配。

```zc
struct Match {
    text: char*;
    start: int;
    len: int;
}
```

## 方法

### 正则构造

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **compile** | `Regex::compile(pattern: char*) -> Regex` | 使用默认标志编译正则模式。 |
| **compile_with_flags** | `Regex::compile_with_flags(pattern: char*, flags: int) -> Regex` | 使用自定义 POSIX 标志进行编译。 |
| **destroy** | `destroy(self)` | 释放已编译的正则表达式。 |

### 匹配与搜索

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **match** | `match(self, text: char*) -> bool` | 如果模式匹配 `text` 中的任意位置，则返回 true。 |
| **find** | `find(self, text: char*) -> Option<Match>` | 返回第一次匹配的结果，包括位置和长度。 |
| **count** | `count(self, text: char*) -> int` | 返回非重叠匹配的数量。 |
| **split** | `split(self, text: char*) -> Vec<String>` | 根据模式拆分文本。 |

### 匹配项访问

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **as_string** | `as_string(self) -> char*` | 返回指向匹配起始位置的指针。 |
| **end** | `end(self) -> int` | 返回匹配项最后一个字符之后的索引。 |

### 静态辅助函数

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **regex_match** | `regex_match(pattern: char*, text: char*) -> bool` | 快速检查匹配。 |
| **regex_find** | `regex_find(pattern: char*, text: char*) -> Option<Match>` | 查找第一次匹配。 |
| **regex_count** | `regex_count(pattern: char*, text: char*) -> int` | 统计所有匹配项。 |
| **regex_split** | `regex_split(pattern: char*, text: char*) -> Vec<String>` | 根据模式拆分文本。 |
