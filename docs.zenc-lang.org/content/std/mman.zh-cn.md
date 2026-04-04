+++
title = "std/sys/mman"
+++

# std/sys/mman

`std/sys/mman` 模块提供了用于内存映射和保护功能的 Zen-C 接口，对 POSIX `sys/mman.h` 进行了封装。

## 概览

- **内存映射**：将文件或匿名内存映射到进程地址空间。
- **保护控制**：动态更改内存区域权限（读、写、执行）。
- **匿名内存**：直接从操作系统分配大块内存，无需关联文件。

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
        println "映射失败";
        return;
    }
    
    // 使用内存...
    
    Memory::munmap(addr, size);
}
```

## 结构体定义

```zc
struct Memory {}
```

## 方法

### `Memory` 方法

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **mmap** | `Memory::mmap(len: usize, prot: int, flags: int) -> void*` | 在调用进程的虚拟地址空间中创建新的映射。 |
| **munmap** | `Memory::munmap(addr: void*, len: usize) -> bool` | 删除指定地址范围的映射。成功时返回 `true`。 |
| **mprotect** | `Memory::mprotect(addr: void*, len: usize, prot: int) -> bool` | 更改调用进程内存页的访问保护。成功时返回 `true`。 |

## 常量

### 保护标志 (Protection Flags)
- `Z_PROT_NONE`：无法访问页面。
- `Z_PROT_READ`：页面可读。
- `Z_PROT_WRITE`：页面可写。
- `Z_PROT_EXEC`：页面可执行。

### 可见性标志 (Visibility Flags)
- `Z_MAP_SHARED`：共享此映射。
- `Z_MAP_PRIVATE`：创建私有的写时拷贝 (copy-on-write) 映射。
- `Z_MAP_ANONYMOUS`：该映射不与任何文件关联。

### 错误值
- `Z_MAP_FAILED" | `mmap` 出错时返回。
