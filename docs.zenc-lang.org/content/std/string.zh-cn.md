+++
title = "std/string"
+++

# std/string

`String` 是一种可增长的、堆分配的字符串类型。它封装了一个 `Vec<char>`，并确保以 null 结尾以保持与 C 的兼容性。

## 使用方法

```zc
import "std/string.zc"

fn main() {
    let s = String::from("Hello");

    // 追加操作需要指向另一个 String 的指针
    let part = String::from(" World");
    s.append(&part);
    
    // 迭代（支持 UTF-8）
    for c in s {
        println "{c}";
    }

    // 使用 c_str() 进行打印
    println "{s.c_str()}"; // 打印 "Hello World"
    
    if (s.starts_with("Hello")) {
        // ...
    }
} // s 会在此处自动释放
```

## 结构体定义

```zc
struct String {
    vec: Vec<char>;
}
```

## 方法

### 构造

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **new** | `String::new(s: char*) -> String` | 从 C 字符串字面量创建一个新的 String。 |
| **from** | `String::from(s: char*) -> String` | `new` 的别名。 |
| **from_rune** | `String::from_rune(r: rune) -> String` | 从单个 `rune`（符文）创建一个新的 String。 |
| **from_runes** | `String::from_runes(runes: rune*, count: usize) -> String` | 从 `runes` 数组创建一个新的 String。 |
| **from_runes_vec** | `String::from_runes_vec(runes: Vec<rune>) -> String` | 从 `rune` 对象的向量创建一个新的 String。 |

### 修改

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **append** | `append(self, other: String*)` | 将另一个字符串追加到本字符串后。 |
| **append_c** | `append_c(self, s: char*)` | 追加一个 C 字符串字面量。 |
| **push_rune** | `push_rune(self, r: rune)` | 将单个 Unicode 代码点 (`rune`) 追加到字符串末尾。 |
| **insert_rune** | `insert_rune(self, idx: usize, r: rune)` | 在指定的*字符索引*处插入一个 `rune`。 |
| **remove_rune_at** | `remove_rune_at(self, idx: usize) -> rune` | 移除并返回指定*字符索引*处的 `rune`。 |
| **reserve** | `reserve(self, cap: usize)` | 确保字符串具有至少能容纳 `cap` 个字符的容量。 |
| **clear** | `clear(self)` | 清空字符串。 |

### 访问与查询

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **c_str** | `c_str(self) -> char*` | 返回底层的 C 字符串指针。 |
| **length** | `length(self) -> usize` | 返回字符串长度（不含 null 终止符）。 |
| **is_empty** | `is_empty(self) -> bool` | 如果长度为 0 则返回 true。 |
| **to_string** | `to_string(self) -> char*` | 映射到 `c_str()`。用于 `{var}` 插值。 |
| **starts_with** | `starts_with(self, prefix: char*) -> bool` | 检查字符串是否以给定的前缀开头。 |
| **ends_with** | `ends_with(self, suffix: char*) -> bool` | 检查字符串是否以给定的后缀结尾。 |
| **contains** | `contains(self, target: char) -> bool` | 检查字符串是否包含给定的字符。 |
| **contains_str** | `contains_str(self, target: char*) -> bool` | 检查字符串是否包含给定的子串。 |
| **find** | `find(self, target: char) -> Option<usize>` | 返回字节 `target` 第一次出现的索引。 |
| **find_str** | `find_str(self, target: char*) -> Option<usize>` | 返回子串 `target` 第一次出现的索引。 |
| **find_all_str** | `find_all_str(self, target: char*) -> Vec<usize>` | 返回包含所有 `target` 出现位置索引的向量。 |
| **substring** | `substring(self, start: usize, len: usize) -> String` | 返回包含指定子串的新 String。 |

### UTF-8 支持

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **utf8_len** | `utf8_len(self) -> usize` | 返回 Unicode 代码点（字符）的数量。 |
| **utf8_at** | `utf8_at(self, idx: usize) -> String` | 以新 String 形式返回指定索引处的字符。 |
| **utf8_get** | `utf8_get(self, idx: usize) -> rune` | 以 `rune` 形式返回指定索引处的字符。 |
| **utf8_substr** | `utf8_substr(self, start_idx: usize, num_chars: usize) -> String` | 根据字符索引返回子串。 |
| **runes** | `runes(self) -> Vec<rune>` | 返回包含所有 Unicode 代码点的向量。 |
| **chars** | `chars(self) -> StringCharsIter` | 返回一个产生 `Option<rune>` 的手动迭代器。 |

### 转换

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **to_lowercase** | `to_lowercase(self) -> String` | 返回转换为小写的新字符串。 |
| **to_uppercase** | `to_uppercase(self) -> String` | 返回转换为大写的新字符串。 |
| **split** | `split(self, delim: char) -> Vec<String>` | 将字符串分割为子串向量。 |
| **trim** | `trim(self) -> String` | 返回移除首尾空白字符后的新字符串。 |
| **replace** | `replace(self, target: char*, replacement: char*) -> String` | 返回执行替换后的新字符串。 |
| **pad_left** | `pad_left(self, target_len: usize, pad_char: char) -> String` | 返回在左侧填充后的新字符串。 |
| **pad_right** | `pad_right(self, target_len: usize, pad_char: char) -> String` | 返回在右侧填充后的新字符串。 |

### 比较

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **eq** | `eq(self, other: String*) -> bool` | 结构相等性检查。 |
| **neq** | `neq(self, other: String*) -> bool` | 结构不等性检查。 |
| **compare** | `compare(self, other: String*) -> int` | 词法比较。 |
| **compare_ignore_case** | `compare_ignore_case(self, other: String*) -> int` | 忽略大小写的词法比较。 |
| **eq_ignore_case** | `eq_ignore_case(self, other: String*) -> bool` | 忽略大小写的相等性检查。 |

## 运算符

| 运算符 | 方法 | 说明 |
| :--- | :--- | :--- |
| `+` | **add** | `s1 + &s2`。将字符串连接成新的 `String`。 |
| `+=` | **add_assign** | `s1 += &s2`。原位将 `s2` 追加到 `s1` 后。 |
| `==` | **eq** | `s1 == &s2`。结构相等性检查。 |
| `!=` | **neq** | `s1 != &s2`。结构不等性检查。 |
| `<` | **lt** | `s1 < &s2`。词法比较。 |
| `>` | **gt** | `s1 > &s2`。词法比较。 |
| `<=` | **le** | `s1 <= &s2`。词法比较。 |
| `>=` | **ge** | `s1 >= &s2`。词法比较。 |
| `{}` | **to_string** | 用于 `printf`/`println` 中的字符串插值。 |

## 迭代

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **iterator** | `iterator(self) -> StringCharsIter` | 返回一个产生 `rune` 的迭代器。用于 `for c in s`。 |

## 内存管理

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **free** | `free(self)` | 手动释放字符串内存。 |
| **destroy** | `destroy(self)` | `free` 的别名。 |
| **forget** | `forget(self)` | 防止自动释放（转移所有权）。 |
| **Trait** | `impl Drop for String" | 超出作用域时自动调用 `free()`。 |
