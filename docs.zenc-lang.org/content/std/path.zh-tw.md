+++
title = "std/path"
+++

# std/path

`std/path` 模組提供了用於處理檔案系統路徑的跨平台工具。它簡化了連接路徑、提取副檔名和尋找上層目錄等常見任務。

## 概覽

- **跨平台**：在處理過程中會適當地處理由斜槓（/）和反斜槓（\）。
- **類型安全**：`Path` 結構體封裝了路徑資訊，將其與一般的字串區分開來。
- **便捷解析**：輕鬆提取 `extension`（副檔名）、`file_name`（檔案名稱）和 `parent`（上層目錄）等組件。
- **RAII**：記憶體透過 `Drop` trait 自動管理。

## 使用方法

```zc
import "std/path.zc"

fn main() {
    let p = Path::new("/home/user");
    let full_path = p.join("docs/file.txt");
    
    println "完整路徑: {full_path.c_str()}";
    
    match full_path.extension() {
        Some(ext) => println "副檔名: {ext}",
        None => println "找不到副檔名"
    }
} // full_path 和 p 在此處自動釋放
```

## 結構體定義

```zc
struct Path {
    str: String;
}
```

## 方法

### 構造

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **new** | `Path::new(s: char*) -> Path` | 從 C 字串建立一個新的 `Path`。 |
| **from_string** | `Path::from_string(s: String) -> Path` | 通過接管 `String` 的所有權來建立 `Path`。 |
| **clone** | `clone(self) -> Path` | 返回 `Path` 的深拷貝。 |

### 操作

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **join** | `join(self, other: char*) -> Path` | 使用正確的目錄分隔符將 `other` 追加到路徑中。 |

### 解析

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **extension** | `extension(self) -> Option<String>` | 返回檔案副檔名（不帶前導點），如果存在的話。 |
| **file_name** | `file_name(self) -> Option<String>` | 返回路徑的最後一部分。 |
| **parent** | `parent(self) -> Option<Path>` | 返回上層目錄路徑。 |

### 存取

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **c_str** | `c_str(self) -> char*` | 返回底層 C 字串表示。 |

## 記憶體管理

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **free** | `free(self)` | 手動釋放路徑的內部字串記憶體。 |
| **Trait** | `impl Drop for Path` | 超出作用域時自動調用 `free()`。 |
