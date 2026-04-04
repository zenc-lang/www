+++
title = "std/regex"
+++

# std/regex

`std/regex` 模組基於 POSIX `regex.h` 提供正規表達式支援。

## 使用方法

```zc
import "std/regex.zc"

fn main() {
    if regex_match("^[a-z]+$", "hello") {
        println "匹配成功！";
    }
    
    let re = Regex::compile("\\d+");
    let count = re.count("123 abc 456");
    re.destroy();
}
```

## 結構體定義

### `Regex`

代表一個已編譯的正規表達式。

```zc
struct Regex {
    // 內部句柄
}
```

### `Match`

代表一個成功的正規表達式匹配結果。

```zc
struct Match {
    text: char*;
    start: int;
    len: int;
}
```

## 方法

### 正規表達式建構

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **compile** | `Regex::compile(pattern: char*) -> Regex` | 使用預設標誌編譯一個正規表達式模式。 |
| **compile_with_flags** | `Regex::compile_with_flags(pattern: char*, flags: int) -> Regex` | 使用自定義 POSIX 標誌進行編譯。 |
| **destroy** | `destroy(self)` | 釋放已編譯的正規表達式。 |

### 匹配與搜尋

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **match** | `match(self, text: char*) -> bool` | 如果模式在 `text` 中的任何位置匹配，則返回 true。 |
| **find** | `find(self, text: char*) -> Option<Match>` | 返回包含位置和長度的第一個匹配結果。 |
| **count** | `count(self, text: char*) -> int` | 返回不重疊的匹配次數。 |
| **split** | `split(self, text: char*) -> Vec<String>` | 根據模式分割字串。 |

### 匹配內容存取

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **as_string** | `as_string(self) -> char*` | 返回到匹配內容起始點的指標。 |
| **end** | `end(self) -> int` | 返回匹配內容最後一個字元之後的索引。 |

### 靜態輔助函數

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **regex_match** | `regex_match(pattern: char*, text: char*) -> bool` | 快速檢查是否匹配。 |
| **regex_find** | `regex_find(pattern: char*, text: char*) -> Option<Match>` | 尋找第一個匹配結果。 |
| **regex_count** | `regex_count(pattern: char*, text: char*) -> int` | 統計所有匹配次數。 |
| **regex_split** | `regex_split(pattern: char*, text: char*) -> Vec<String>` | 根據模式分割字串。 |
