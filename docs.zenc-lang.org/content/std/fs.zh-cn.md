+++
title = "std/fs"
+++

# std/fs

`std/fs` 模块提供了与文件系统交互的全面 API，包括文件 I/O、目录操作和元数据检索。

## 概览

- **安全句柄**：`File` 结构体提供了对原始文件句柄的安全封装。
- **RAII**：通过 `Drop` trait，文件句柄在超出作用域时会自动关闭。
- **错误处理**：所有可能失败的操作都使用 `Result<T>`，并提供描述性的错误消息。
- **便捷性**：包含用于常见任务的静态方法，例如在一次调用中读取或写入整个文件。

## 使用方法

```zc
import "std/fs.zc"

fn main() {
    // 使用 RAII 进行基本文件读取
    match File::read_all("config.txt") {
        Ok(content) => println "配置内容: {content}",
        Err(e) => println "读取配置出错: {e}"
    }
    
    // 显式文件句柄，自动关闭
    match File::open("data.log", "a") {
        Ok(file) => {
            file.write_string("日志条目\n");
            // 文件在此处自动关闭
        }
        Err(e) => println "打开日志失败: {e}"
    }
}
```

## 结构体定义

### `File`
表示一个打开的文件句柄。
```zc
struct File {
    handle: void*;
}
```

### `Metadata`
文件或目录的元数据。
```zc
struct Metadata {
    size: U64;
    is_dir: bool;
    is_file: bool;
}
```

### `DirEntry`
表示目录中的一个条目。
```zc
struct DirEntry {
    name: String;
    is_dir: bool;
}
```

## 方法

### 打开 / 关闭

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **open** | `File::open(path: char*, mode: char*) -> Result<File>` | 以 `mode` 模式打开位于 `path` 的文件。 |
| **close** | `close(self)` | 显式关闭文件句柄。 |

### 读取 / 写入

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **read_to_string** | `read_to_string(self) -> Result<String>` | 将整个文件读入 `String`。 |
| **read_all** | `File::read_all(path: char*) -> Result<String>` | 用于完全读取文件的静态工具方法。 |
| **read_lines** | `File::read_lines(path: char*) -> Result<Vec<String>>` | 将文件按行读入向量的静态工具方法。 |
| **write_string** | `write_string(self, content: char*) -> Result<bool>` | 将字符串写入文件。 |
| **write_lines** | `File::write_lines(path: char*, lines: Vec<String>*) -> Result<bool>` | 将字符串向量写入文件的静态工具方法。 |

### 路径工具

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **exists** | `File::exists(path: char*) -> bool` | 如果路径存在，则返回 true。 |
| **current_dir** | `File::current_dir() -> Result<String>` | 返回当前工作目录的绝对路径。 |
| **metadata** | `File::metadata(path: char*) -> Result<Metadata>` | 检索指定路径的元数据。 |

### 文件与目录操作

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **create_dir** | `File::create_dir(path: char*) -> Result<bool>` | 创建一个新目录。 |
| **remove_file** | `File::remove_file(path: char*) -> Result<bool>` | 删除指定的文件。 |
| **remove_dir** | `File::remove_dir(path: char*) -> Result<bool>` | 删除指定的目录（必须为空）。 |
| **read_dir** | `File::read_dir(path: char*) -> Result<Vec<DirEntry>>` | 返回目录中的条目列表。 |

## 内存管理

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **Trait** | `impl Drop for File` | 当超出作用域时自动关闭文件句柄。 |
