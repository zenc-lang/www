+++
title = "std/utf8"
+++

# std/utf8

`std/utf8` 模組提供了處理 Unicode 碼點（`rune` 類型）和 UTF-8 編碼的工具。

## 使用方法

```zc
import "std/utf8.zc"

fn main() {
    let r = 'ñ';
    
    if (Utf8::is_alpha(r)) {
        println "{r} 是一個字母";
    }
}
```

## 方法

### 查詢與識別

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **is_digit** | `is_digit(r: rune) -> bool` | 如果 rune 是十進制數字 (0-9)，則返回 true。 |
| **is_alpha** | `is_alpha(r: rune) -> bool` | 如果 rune 是字母字元，則返回 true。 |
| **is_whitespace** | `is_whitespace(r: rune) -> bool` | 如果 rune 是空白字元，則返回 true。 |
| **is_upper** | `is_upper(r: rune) -> bool` | 如果 rune 是大寫字母，則返回 true。 |
| **is_lower** | `is_lower(r: rune) -> bool` | 如果 rune 是小寫字母，則返回 true。 |
| **is_valid** | `is_valid(data: char*, len: usize) -> bool` | 如果緩衝區包含有效的 UTF-8 數據，則返回 true。 |

### 轉換

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **to_upper** | `to_upper(r: rune) -> rune` | 返回 rune 的大寫版本。 |
| **to_lower** | `to_lower(r: rune) -> rune` | 返回 rune 的小寫版本。 |

### 編碼與解碼

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **encode** | `encode(r: rune, buf: char*) -> usize` | 將一個 rune 編碼為 UTF-8。返回寫入的位元組數 (1-4)。 |
| **rune_len** | `rune_len(r: rune) -> usize` | 返回編碼該 rune 所需的位元組數。 |
| **decode** | `decode(data: char*, len: usize, consumed: usize*) -> rune` | 從數據中解碼第一個 UTF-8 序列。 |
