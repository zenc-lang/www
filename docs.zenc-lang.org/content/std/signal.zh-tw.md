+++
title = "std/sys/signal"
+++

# std/sys/signal

`std/sys/signal` 模組提供了處理系統訊號的原語，對 POSIX `signal.h` 的功能進行了封裝。

## 概覽

- **訊號攔截**：為 `SIGINT` (Ctrl+C) 等訊號定義自定義處理程序。
- **優雅終止**：在結束前使用訊號處理程序執行清理工作。
- **常用常數**：為標準訊號提供跨平台定義。

## 使用方法

```zc
import "std/sys/signal.zc"
import "std/io.zc"

fn on_interrupt(sig: int) {
    println "接收到 SIGINT ({sig})。正在進行清理...";
    exit(0);
}

fn main() {
    Signal::set_handler(Z_SIGINT, on_interrupt);
    println "正在等待 Ctrl+C...";
    while(true) {}
}
```

## 結構體定義

```zc
struct Signal {}
```

## 方法

### `Signal` 方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **set_handler** | `Signal::set_handler(sig: int, handler: fn*(int)) -> fn*(int)` | 為指定的訊號註冊處理程序，並返回之前的處理程序。 |

## 常數

### 標準訊號
- `Z_SIGINT`：來自鍵盤的中斷 (Ctrl+C)。
- `Z_SIGILL`：非法指令。
- `Z_SIGABRT`：中止訊號。
- `Z_SIGFPE`：浮點運算例外。
- `Z_SIGSEGV`：段錯誤（無效的記憶體存取）。
- `Z_SIGTERM`：終止訊號。
