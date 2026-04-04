+++
title = "std/sys/stat"
+++

# std/sys/stat

`std/sys/stat` 模組提供了一個用於檢索擴展檔案元數據（metadata）和狀態資訊的介面，對 POSIX `sys/stat.h` 進行了封裝。

## 概覽

- **檔案元數據**：檢索檔案大小、模式（權限）和時間戳記。
- **時間戳記**：以 Unix 時間戳記的形式存取存取時間、修改時間和變更時間。
- **類型檢查**：輔助方法，用於判斷模式是代表檔案還是目錄。

## 使用方法

```zc
import "std/sys/stat.zc"
import "std/io.zc"

fn main() {
    let res = FileStat::stat("myfile.txt");
    if (res.is_some()) {
        let st = res.unwrap();
        println "大小: {st.size} 位元組";
        println "權限: {st.mode}";
        
        if (FileStat::is_dir(st.mode)) {
            println "這是一個目錄。";
        }
    }
}
```

## 結構體定義

### `Stat`
包含 Unix 風格的檔案元數據。
```zc
struct Stat {
    mode: u32;
    size: u64;
    atime: i64;
    mtime: i64;
    ctime: i64;
    uid: u32;
    gid: u32;
}
```

## 方法

### `FileStat` 方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **stat** | `FileStat::stat(path: char*) -> Option<Stat>` | 返回指定路徑的元數據，如果失敗則返回 `None`。 |
| **is_dir** | `FileStat::is_dir(mode: u32) -> bool` | 檢查指定的模式是否代表一個目錄。 |
| **is_file** | `FileStat::is_file(mode: u32) -> bool` | 檢查指定的模式是否代表一個一般檔案。 |
