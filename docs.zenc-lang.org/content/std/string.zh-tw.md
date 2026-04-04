+++
title = "std/string"
+++

# std/string

`String` 是一個可增長的、堆分配（heap-allocated）的字串類型。它封裝了一個 `Vec<char>` 並確保以 null 結尾，以實現 C 相容性。

## 使用方法

```zc
import "std/string.zc"

fn main() {
    let s = String::from("Hello");

    // 追加操作需要另一個 String 的指標
    let part = String::from(" World");
    s.append(&part);
    
    // 迭代（支援 UTF-8）
    for c in s {
        println "{c}";
    }

    // 使用 c_str() 進行列印
    println "{s.c_str()}"; // 列印 "Hello World"
    
    if (s.starts_with("Hello")) {
        // ...
    }
} // s 在此處自動釋放
```

## 結構體定義

```zc
struct String {
    vec: Vec<char>;
}
```

## 方法

### 構造

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **new** | `String::new(s: char*) -> String` | 從 C 字串原語建立一個新的 String。 |
| **from** | `String::from(s: char*) -> String` | `new` 的別名。 |
| **from_rune** | `String::from_rune(r: rune) -> String` | 從單個 `rune` 建立一個新的 String。 |
| **from_runes** | `String::from_runes(runes: rune*, count: usize) -> String` | 從 `rune` 陣列建立一個新的 String。 |
| **from_runes_vec** | `String::from_runes_vec(runes: Vec<rune>) -> String` | 從 `rune` 物件的向量（vector）建立一個新的 String。 |

### 修改

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **append** | `append(self, other: String*)` | 將另一個字串追加到此字串末尾。 |
| **append_c** | `append_c(self, s: char*)` | 追加一個 C 字串字面量。 |
| **push_rune** | `push_rune(self, r: rune)` | 向字串追加單個 Unicode 碼點（`rune`）。 |
| **insert_rune** | `insert_rune(self, idx: usize, r: rune)` | 在指定的「字元索引」處插入一個 `rune`。 |
| **remove_rune_at** | `remove_rune_at(self, idx: usize) -> rune` | 移除並返回指定「字元索引」處的 `rune`。 |
| **reserve** | `reserve(self, cap: usize)` | 確保字串至少具有 `cap` 個字元的容量。 |
| **clear** | `clear(self)` | 清空字串。 |

### 存取與查詢

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **c_str** | `c_str(self) -> char*` | 返回底層 C 字串指標。 |
| **length** | `length(self) -> usize` | 返回字串長度（不含 null 終結符）。 |
| **is_empty** | `is_empty(self) -> bool` | 如果長度為 0 則返回 true。 |
| **to_string** | `to_string(self) -> char*` | 映射至 `c_str()`。用於 `{var}` 插值。 |
| **starts_with** | `starts_with(self, prefix: char*) -> bool` | 檢查字串是否以指定前綴開頭。 |
| **ends_with** | `ends_with(self, suffix: char*) -> bool` | 檢查字串是否以指定後綴結尾。 |
| **contains** | `contains(self, target: char) -> bool` | 檢查字串是否包含指定字元。 |
| **contains_str** | `contains_str(self, target: char*) -> bool` | 檢查字串是否包含指定子字串。 |
| **find** | `find(self, target: char) -> Option<usize>` | 返回位元組 `target` 第一次出現的索引。 |
| **find_str** | `find_str(self, target: char*) -> Option<usize>` | 返回子字串 `target` 第一次出現的索引。 |
| **find_all_str** | `find_all_str(self, target: char*) -> Vec<usize>` | 返回包含 `target` 所有出現索引的向量。 |
| **substring** | `substring(self, start: usize, len: usize) -> String` | 返回包含指定子字串的新 String。 |

### UTF-8 支援

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **utf8_len** | `utf8_len(self) -> usize` | 返回 Unicode 碼點（字元）的數量。 |
| **utf8_at** | `utf8_at(self, idx: usize) -> String` | 將指定索引處的字元作為新 String 返回。 |
| **utf8_get** | `utf8_get(self, idx: usize) -> rune` | 將指定索引處的字元作為 `rune` 返回。 |
| **utf8_substr** | `utf8_substr(self, start_idx: usize, num_chars: usize) -> String` | 根據字元索引返回子字串。 |
| **runes** | `runes(self) -> Vec<rune>` | 返回包含所有 Unicode 碼點的向量。 |
| **chars** | `chars(self) -> StringCharsIter` | 返回一個手動迭代器，產生 `Option<rune>`。 |

### 轉換

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **to_lowercase** | `to_lowercase(self) -> String` | 返回轉換為小寫的新字串。 |
| **to_uppercase** | `to_uppercase(self) -> String` | 返回轉換為大寫的新字串。 |
| **split** | `split(self, delim: char) -> Vec<String>` | 將字串分割成子字串向量。 |
| **trim** | `trim(self) -> String` | 返回移除首尾空白的新字串。 |
| **replace** | `replace(self, target: char*, replacement: char*) -> String` | 返回執行替換後的新字串。 |
| **pad_left** | `pad_left(self, target_len: usize, pad_char: char) -> String` | 返回在左側填充後的新字串。 |
| **pad_right** | `pad_right(self, target_len: usize, pad_char: char) -> String` | 返回在右側填充後的新字串。 |

### 比較

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **eq** | `eq(self, other: String*) -> bool` | 結構相等性檢查。 |
| **neq** | `neq(self, other: String*) -> bool` | 結構不等性檢查。 |
| **compare** | `compare(self, other: String*) -> int` | 詞法比較。 |
| **compare_ignore_case** | `compare_ignore_case(self, other: String*) -> int` | 忽略大小寫的詞法比較。 |
| **eq_ignore_case** | `eq_ignore_case(self, other: String*) -> bool` | 忽略大小寫的相等性檢查。 |

## 運算子

| 運算子 | 方法 | 說明 |
| :--- | :--- | :--- |
| `+` | **add** | `s1 + &s2`。將字串連接成新的 `String`。 |
| `+=` | **add_assign** | `s1 += &s2`。在原處將 `s2` 追加到 `s1`。 |
| `==` | **eq** | `s1 == &s2`。結構相等性檢查。 |
| `!=` | **neq** | `s1 != &s2`。結構不等性檢查。 |
| `<` | **lt** | `s1 < &s2`。詞法比較。 |
| `>` | **gt** | `s1 > &s2`。詞法比較。 |
| `<=` | **le** | `s1 <= &s2`。詞法比較。 |
| `>=` | **ge** | `s1 >= &s2`。詞法比較。 |
| `{}` | **to_string** | 用於 `printf`/`println` 中的字串插值。 |

## 迭代

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **iterator** | `iterator(self) -> StringCharsIter` | 返回產生 `rune` 的迭代器。由 `for c in s` 使用。 |

## 記憶體管理

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **free** | `free(self)` | 手動釋放字串記憶體。 |
| **destroy** | `destroy(self)` | `free` 的別名。 |
| **forget** | `forget(self)` | 防止自動釋放（轉移所有權）。 |
| **Trait** | `impl Drop for String` | 超出作用域時自動調用 `free()`。 |
