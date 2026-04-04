+++
title = "std/path"
+++

# std/path

`std/path` 模块提供了用于操作文件系统路径的跨平台工具。它简化了路径连接、提取扩展名以及查找父目录等常见任务。

## 概览

- **跨平台**：在操作过程中会妥善处理正斜杠和反斜杠。
- **类型安全**：`Path` 结构体封装了路径信息，使其与普通字符串区分开来。
- **便捷解析**：轻松提取 `extension`（扩展名）、`file_name`（文件名）和 `parent`（父目录）等组件。
- **RAII**：内存通过 `Drop` trait 自动管理。

## 使用方法

```zc
import "std/path.zc"

fn main() {
    let p = Path::new("/home/user");
    let full_path = p.join("docs/file.txt");
    
    println "完整路径: {full_path.c_str()}";
    
    match full_path.extension() {
        Some(ext) => println "扩展名: {ext}",
        None => println "未找到扩展名"
    }
} // full_path 和 p 会在此处自动释放
```

## 结构体定义

```zc
struct Path {
    str: String;
}
```

## 方法

### 构造

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **new** | `Path::new(s: char*) -> Path` | 从 C 字符串创建一个新的 `Path`。 |
| **from_string** | `Path::from_string(s: String) -> Path" | 通过接管 `String` 所有权来创建一个 `Path`。 |
| **clone** | `clone(self) -> Path` | 返回 `Path` 的一个深拷贝。 |

### 操作

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **join** | `join(self, other: char*) -> Path` | 使用正确的目录分隔符将 `other` 追加到路径后。 |

### 解析

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **extension** | `extension(self) -> Option<String>` | 返回文件扩展名（不含前导点），如果有的话。 |
| **file_name** | `file_name(self) -> Option<String>` | 返回路径的最后一个组件。 |
| **parent** | `parent(self) -> Option<Path>` | 返回父目录路径。 |

### 访问

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **c_str** | `c_str(self) -> char*` | 返回底层的 C 字符串表示。 |

## 内存管理

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **free** | `free(self)` | 手动释放路径的内部字符串内存。 |
| **Trait** | `impl Drop for Path` | 当超出作用域时自动调用 `free()`。 |
