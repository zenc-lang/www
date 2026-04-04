+++
title = "std/sys/signal"
+++

# std/sys/signal

`std/sys/signal` 模块提供了处理系统信号的原语，对 POSIX `signal.h` 的功能进行了封装。

## 概览

- **信号拦截**：为 `SIGINT` (Ctrl+C) 等信号定义自定义处理函数。
- **优雅退出**：在退出前使用信号处理程序执行清理工作。
- **常见常量**：提供标准信号的跨平台定义。

## 使用方法

```zc
import "std/sys/signal.zc"
import "std/io.zc"

fn on_interrupt(sig: int) {
    println "收到 SIGINT ({sig})。正在处理清理工作...";
    exit(0);
}

fn main() {
    Signal::set_handler(Z_SIGINT, on_interrupt);
    println "正在等待 Ctrl+C...";
    while(true) {}
}
```

## 结构体定义

```zc
struct Signal { }
```

## 方法

### `Signal` 方法

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **set_handler** | `Signal::set_handler(sig: int, handler: fn*(int)) -> fn*(int)` | 为给定信号注册处理函数，并返回之前的处理函数。 |

## 常量

### 标准信号

- `Z_SIGINT`：来自键盘的中断 (Ctrl+C)。
- `Z_SIGILL`：非法指令。
- `Z_SIGABRT`：中止信号。
- `Z_SIGFPE`：浮点异常。
- `Z_SIGSEGV`：段错误（无效内存访问）。
- `Z_SIGTERM`：终止信号。
