+++
title = "std/sys/mman"
+++

# std/sys/mman

`std/sys/mman` 模組為記憶體映射和保護功能提供了一個 Zen-C 介面，對 POSIX `sys/mman.h` 進行了封裝。

## 概覽

- **記憶體映射**：將檔案或匿名記憶體映射到行程位址空間。
- **保護控制**：動態更改記憶體區域權限（讀取、寫錄、執行）。
- **匿名記憶體**：直接從 OS 分配大塊記憶體，而不對應到檔案。

## 使用方法

```zc
import "std/sys/mman.zc"
import "std/io.zc"

fn main() {
    let size: usize = 4096;
    let prot = Z_PROT_READ | Z_PROT_WRITE;
    let flags = Z_MAP_PRIVATE | Z_MAP_ANONYMOUS;
    
    let addr = Memory::mmap(size, prot, flags);
    if ((isize)addr == Z_MAP_FAILED) {
        println "映射失敗";
        return;
    }
    
    // 使用記憶體...
    
    Memory::munmap(addr, size);
}
```

## 結構體定義

```zc
struct Memory {}
```

## 方法

### `Memory` 方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **mmap** | `Memory::mmap(len: usize, prot: int, flags: int) -> void*` | 在呼叫行程的虛擬位址空間中建立一個新映射。 |
| **munmap** | `Memory::munmap(addr: void*, len: usize) -> bool` | 刪除指定位址範圍的映射。成功時返回 `true`。 |
| **mprotect** | `Memory::mprotect(addr: void*, len: usize, prot: int) -> bool" | 更改呼叫行程記憶體分頁的存取保護權限。成功時返回 `true`。 |

## 常數

### 保護標誌 (Protection Flags)
- `Z_PROT_NONE`：分頁無法存取。
- `Z_PROT_READ`：分頁可讀取。
- `Z_PROT_WRITE`：分頁可寫入。
- `Z_PROT_EXEC`：分頁可執行。

### 可見性標誌 (Visibility Flags)
- `Z_MAP_SHARED`：共享此映射。
- `Z_MAP_PRIVATE`：建立私有的「寫入時複製」（copy-on-write）映射。
- `Z_MAP_ANONYMOUS`：不對應到任何檔案的映射。

### 錯誤值
- `Z_MAP_FAILED`：`mmap` 發生錯誤時返回的值。
