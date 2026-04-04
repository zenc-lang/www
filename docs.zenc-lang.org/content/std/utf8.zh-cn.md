+++
title = "std/utf8"
+++

# std/utf8

`std/utf8` 模块提供了用于处理 Unicode 代码点（`rune` 类型）和 UTF-8 编码的工具。

## 使用方法

```zc
import "std/utf8.zc"

fn main() {
    let r = 'ñ';
    
    if (Utf8::is_alpha(r)) {
        println "{r} 是一个字母";
    }
}
```

## 方法

### 查询与识别

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **is_digit** | `is_digit(r: rune) -> bool` | 如果符文 (rune) 是十进制数字 (0-9)，则返回 true。 |
| **is_alpha** | `is_alpha(r: rune) -> bool` | 如果符文是字母字符，则返回 true。 |
| **is_whitespace** | `is_whitespace(r: rune) -> bool` | 如果符文是空白字符，则返回 true。 |
| **is_upper** | `is_upper(r: rune) -> bool` | 如果符文是大写字母，则返回 true。 |
| **is_lower** | `is_lower(r: rune) -> bool` | 如果符文是小写字母，则返回 true。 |
| **is_valid** | `is_valid(data: char*, len: usize) -> bool` | 如果缓冲区包含有效的 UTF-8 数据，则返回 true。 |

### 转换

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **to_upper** | `to_upper(r: rune) -> rune` | 返回符文的大写版本。 |
| **to_lower** | `to_lower(r: rune) -> rune` | 返回符文的小写版本。 |

### 编码与解码

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **encode** | `encode(r: rune, buf: char*) -> usize` | 将符文编码为 UTF-8。返回写入的字节数 (1-4)。 |
| **rune_len** | `rune_len(r: rune) -> usize` | 返回编码该符文所需的字节数。 |
| **decode** | `decode(data: char*, len: usize, consumed: usize*) -> rune` | 从数据中解码第一个 UTF-8 序列。 |
