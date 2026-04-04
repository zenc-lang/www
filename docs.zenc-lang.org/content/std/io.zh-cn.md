+++
title = "std/io"
+++

# std/io

`std/io` 模块提供标准输入/输出功能，包括向标准输出 (stdout) 进行格式化打印，以及从标准输入 (stdin) 进行健壮地读取。

## 概览

- **格式化输出**：提供 `print` 和 `println`，支持 C 风格的格式说明符（`%s`、`%d` 等）。
- **字符串格式化**：提供多种选项，可格式化到静态缓冲区、用户指定的缓冲区或堆分配的缓冲区。
- **Unicode 感知**：包含 `read_rune`，用于从 stdin 读取单个 UTF-8 字符。
- **转换工具**：提供将整数和符文 (rune) 转换为字符串的简单方法。

## 使用方法

```zc
import "std/io.zc"

fn main() {
    // 基本打印
    println("Hello, %s!", "Zen-C");
    
    // 读取一行输入
    print("请输入您的名字: ");
    autofree let name = readln();
    
    if name != NULL {
        println("问候, %s", name);
    }
}
```

## 方法

### 输出

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **print** | `print(fmt: char*, ...) -> int` | 向 stdout 打印格式化输出。 |
| **println** | `println(fmt: char*, ...) -> int` | 向 stdout 打印格式化输出，并换行。 |

### 输入

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **readln** | `readln() -> char*` | 从 stdin 读取一行。返回堆分配的字符串（调用者必须释放）。 |
| **read_rune** | `read_rune() -> rune` | 从 stdin 读取单个 UTF-8 字符 (rune)。 |

### 格式化

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **format** | `format(fmt: char*, ...) -> char*` | 格式化到内部静态缓冲区。**警告**：非线程安全。 |
| **format_into** | `format_into(buf: char*, size: usize, fmt: char*, ...) -> int` | 格式化到特定大小的用户提供的缓冲区。 |
| **format_new** | `format_new(fmt: char*, ...) -> char*` | 格式化到新的堆分配缓冲区。调用者必须释放。 |

### 转换

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **itos** | `itos(n: int) -> char*` | 在静态缓冲区中将 `n` 转换为字符串。 |
| **itos_new** | `itos_new(n: int) -> char*` | 将 `n` 转换为堆分配的字符串。 |
| **utos** | `utos(n: uint) -> char*` | 在静态缓冲区中将无符号数 `n` 转换为字符串。 |
