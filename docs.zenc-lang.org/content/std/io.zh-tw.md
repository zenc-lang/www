+++
title = "std/io"
+++

# std/io

`std/io` 模組提供標準輸入/輸出功能，包括向標準輸出 (stdout) 進行格式化列印，以及從標準輸入 (stdin) 進行穩健的讀取。

## 概覽

- **格式化輸出**：提供 `print` 和 `println`，支援 C 風格的格式說明符（`%s`、`%d` 等）。
- **字串格式化**：多種選項用於格式化到靜態、使用者提供或堆分配（heap-allocated）的緩衝區中。
- **支援 Unicode**：包含 `read_rune`，用於從標準輸入讀取單個 UTF-8 字符。
- **轉換工具**：簡單的方法用於將整數和符文（runes）轉換為字串。

## 使用方法

```zc
import "std/io.zc"

fn main() {
    // 基本列印
    println("你好，%s！", "Zen-C");
    
    // 讀取一行輸入
    print("輸入您的姓名：");
    autofree let name = readln();
    
    if name != NULL {
        println("問候，%s", name);
    }
}
```

## 方法

### 輸出

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **print** | `print(fmt: char*, ...) -> int` | 向標準輸出列印格式化內容。 |
| **println** | `println(fmt: char*, ...) -> int` | 向標準輸出列印格式化內容，後跟換行符。 |

### 輸入

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **readln** | `readln() -> char*` | 從標準輸入讀取一行。返回堆分配的字串（呼叫者必須釋放）。 |
| **read_rune** | `read_rune() -> rune` | 從標準輸入讀取單個 UTF-8 字符 (rune)。 |

### 格式化

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **format** | `format(fmt: char*, ...) -> char*` | 格式化到內部靜態緩衝區。**警告**：非執行緒安全。 |
| **format_into** | `format_into(buf: char*, size: usize, fmt: char*, ...) -> int` | 格式化到指定大小的使用者提供緩衝區中。 |
| **format_new** | `format_new(fmt: char*, ...) -> char*` | 格式化到新的堆分配緩衝區中。呼叫者必須釋放。 |

### 轉換

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **itos** | `itos(n: int) -> char*` | 在靜態緩衝區中將 `n` 轉換為字串。 |
| **itos_new** | `itos_new(n: int) -> char*` | 將 `n` 轉換為堆分配的字串。 |
| **utos** | `utos(n: uint) -> char*` | 在靜態緩衝區中將無符號的 `n` 轉換為字串。 |
