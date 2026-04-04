+++
title = "std/fs"
+++

# std/fs

`std/fs` 模組提供了一個全面的 API，用於與檔案系統進行互動，包括檔案 I/O、目錄操作和元資料（metadata）檢索。

## 概覽

- **安全控制**：`File` 結構體為原始檔案句柄（handles）提供了一個安全的封裝。
- **RAII**：檔案句柄在超出作用域時，會透過 `Drop` trait 自動關閉。
- **錯誤處理**：對所有可能失敗的操作使用 `Result<T>`，並提供描述性的錯誤訊息。
- **便捷性**：包含靜態方法，用於處理常見任務，例如在一次呼叫中讀取或寫入整個檔案。

## 使用方法

```zc
import "std/fs.zc"

fn main() {
    // 使用 RAII 的基本檔案讀取
    match File::read_all("config.txt") {
        Ok(content) => println "配置內容: {content}",
        Err(e) => println "讀取配置出錯: {e}"
    }
    
    // 具有自動關閉功能的顯式檔案句柄
    match File::open("data.log", "a") {
        Ok(file) => {
            file.write_string("日誌項目\n");
            // 檔案在此處自動關閉
        }
        Err(e) => println "無法開啟日誌: {e}"
    }
}
```

## 結構體定義

### `File`
代表一個開啟的檔案句柄。
```zc
struct File {
    handle: void*;
}
```

### `Metadata`
檔案或目錄的元資料。
```zc
struct Metadata {
    size: U64;
    is_dir: bool;
    is_file: bool;
}
```

### `DirEntry`
代表目錄中的一個項目。
```zc
struct DirEntry {
    name: String;
    is_dir: bool;
}
```

## 方法

### 開启 / 關閉

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **open** | `File::open(path: char*, mode: char*) -> Result<File>` | 使用 `mode` 模式開啟位於 `path` 的檔案。 |
| **close** | `close(self)` | 顯式關閉檔案句柄。 |

### 讀取 / 寫入

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **read_to_string** | `read_to_string(self) -> Result<String>` | 將整個檔案內容讀入到 `String` 中。 |
| **read_all** | `File::read_all(path: char*) -> Result<String>` | 靜態工具方法，用於完整讀取一個檔案。 |
| **read_lines** | `File::read_lines(path: char*) -> Result<Vec<String>>` | 靜態工具方法，將檔案內容讀入到字串向量中。 |
| **write_string** | `write_string(self, content: char*) -> Result<bool>` | 將字串寫入檔案。 |
| **write_lines** | `File::write_lines(path: char*, lines: Vec<String>*) -> Result<bool>` | 靜態工具方法，將字串向量寫入檔案。 |

### 路徑工具

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **exists** | `File::exists(path: char*) -> bool` | 如果路徑存在則返回 true。 |
| **current_dir** | `File::current_dir() -> Result<String>` | 返回目前工作目錄的絕對路徑。 |
| **metadata** | `File::metadata(path: char*) -> Result<Metadata>` | 檢索指定路徑的元資料。 |

### 檔案與目錄操作

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **create_dir** | `File::create_dir(path: char*) -> Result<bool>` | 建立一個新目錄。 |
| **remove_file** | `File::remove_file(path: char*) -> Result<bool>` | 刪除指定的檔案。 |
| **remove_dir** | `File::remove_dir(path: char*) -> Result<bool>` | 刪除指定的目錄（必須為空）。 |
| **read_dir** | `File::read_dir(path: char*) -> Result<Vec<DirEntry>>` | 返回目錄中項目的列表。 |

## 記憶體管理

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **Trait** | `impl Drop for File` | 超出作用域時自動關閉檔案句柄。 |
