+++
title = "std/thread"
+++

# std/thread

`std/thread` 模組提供了用於建立和管理並行執行緒的高階原語。

## 概覽

- **原生執行緒**：使用底層系統級執行緒（如 POSIX 執行緒）。
- **閉包支援**：`Thread::spawn` 可以接受 Zen-C 閉包，方便在執行緒之間共享數據。
- **顯式生命週期**：執行緒必須被顯式地連接（joined）或分離（detached），以確保資源正確清理。
- **安全**：執行緒建立或操作過程中的錯誤會通過 `Result<bool>` 回報。

## 使用方法

```zc
import "std/thread.zc"

fn worker(id: int) {
    println "來自 worker {id} 的問候";
}

fn main() {
    // 使用閉包衍生執行緒
    let t = Thread::spawn(|| {
        worker(42);
    }).unwrap();
    
    // 顯式等待完成
    t.join();
}
```

## 結構體定義

### `Thread`
代表一個衍生執行緒的句柄。
```zc
struct Thread {
    handle: void*;
}
```

## 方法

### `Thread` 生命週期

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **spawn** | `Thread::spawn(func: fn()) -> Result<Thread>` | 衍生一個執行所提供閉包或函數的新執行緒。 |
| **join** | `join(self) -> Result<bool>` | 阻塞目前執行緒，直到衍生的執行緒終止。 |
| **detach** | `detach(self) -> Result<bool>` | 分離執行緒，使其獨立運行。資源在退出程序時自動釋放。 |
| **cancel** | `cancel(self) -> Result<bool>` | 向執行緒發送取消請求。 |

### 工具函數

| 函數 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **sleep_ms** | `sleep_ms(ms: int)` | 將目前執行緒掛起約 `ms` 毫秒。 |
