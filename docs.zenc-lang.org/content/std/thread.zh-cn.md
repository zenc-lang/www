+++
title = "std/thread"
+++

# std/thread

`std/thread` 模块提供了用于创建和管理并发执行线程的高级原语。

## 概览

- **原生线程**：使用底层的系统级线程（如 POSIX 线程）。
- **闭包支持**：`Thread::spawn` 可以接受 Zen-C 闭包，方便在线程间共享数据。
- **显式生命周期**：线程必须被显式地 join（连接）或 detach（分离），以确保妥善清理资源。
- **安全性**：创建或操作线程过程中的错误会通过 `Result<bool>` 报告。

## 使用方法

```zc
import "std/thread.zc"

fn worker(id: int) {
    println "来自工作线程 {id} 的问候";
}

fn main() {
    // 使用闭包进行生成
    let t = Thread::spawn(|| {
        worker(42);
    }).unwrap();
    
    // 显式等待完成
    t.join();
}
```

## 结构体定义

### `Thread`
表示已生成线程的句柄。
```zc
struct Thread {
    handle: void*;
}
```

## 方法

### `Thread` 生命周期

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **spawn** | `Thread::spawn(func: fn()) -> Result<Thread>` | 生成一个执行所提供闭包或函数的新线程。 |
| **join** | `join(self) -> Result<bool>` | 阻塞当前线程，直到所生成的线程终止。 |
| **detach** | `detach(self) -> Result<bool>` | 分离线程，允许其独立运行。资源在退出时自动释放。 |
| **cancel** | `cancel(self) -> Result<bool>" | 向线程发送取消请求。 |

### 工具函数

| 函数 | 签名 | 说明 |
| :--- | :--- | :--- |
| **sleep_ms** | `sleep_ms(ms: int)` | 将当前线程的执行挂起约 `ms` 毫秒。 |
