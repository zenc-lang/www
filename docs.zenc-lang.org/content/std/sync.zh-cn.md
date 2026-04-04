+++
title = "std/sync"
+++

# std/sync

`std/sync` 模块提供了一套全面的同步原语，用于管理对共享数据的并发访问以及协调线程执行。

## 概览

- **标准原语**：包括 `Mutex`、`CondVar`、`RwLock`、`Once`、`Semaphore` 和 `Barrier`。
- **RAII 集成**：所有原语都实现了 `Drop` trait，确保自动释放系统资源（如 pthread 句柄）。
- **跨平台**：安全地抽象了平台特定的差异（例如在 macOS 上通过 mutex/condvar 实现 `Barrier` 和 `Semaphore`）。
- **高效性**：对经过优化的系统级同步库进行了薄层封装。

## 使用方法

```zc
import "std/sync.zc"

fn main() {
    let m = Mutex::new();
    
    // 作用域锁 (RAII)
    {
        m.lock();
        // 临界区
        m.unlock();
    } // 如果 'm' 是最后的所有者，则在此处自动释放
    
    // 一次性初始化
    let once = Once::new();
    once.call(|| {
        println "已完成初始化！";
    });
}
```

## 结构体定义

### `Mutex`
用于保护共享数据的互斥锁。

### `CondVar`
条件变量，用于线程之间根据状态变化进行通信。

### `RwLock`
读写锁，允许多个并发读取者，但只允许一个写入者。

### `Once`
确保特定的初始化代码仅被执行一次。

### `Semaphore`
计数信号量，用于控制对资源池的访问。

### `Barrier`
同步点，多个线程必须在此等待，直到达到指定数量。

## 方法

### `Mutex` 方法

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **new** | `Mutex::new() -> Mutex` | 创建一个新的互斥锁。 |
| **lock** | `lock(self)` | 获取锁（阻塞）。 |
| **try_lock** | `try_lock(self) -> bool` | 尝试获取锁而不阻塞。 |
| **unlock** | `unlock(self)` | 释放锁。 |

### `CondVar` 方法

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **new** | `CondVar::new() -> CondVar` | 创建一个新的条件变量。 |
| **wait** | `wait(self, mutex: Mutex*)` | 阻塞线程直到收到信号，并临时释放互斥锁。 |
| **signal** | `signal(self)` | 唤醒一个在此条件上等待的线程。 |
| **broadcast**| `broadcast(self)" | 唤醒所有在此条件上等待的线程。 |

### `RwLock` 方法

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **new** | `RwLock::new() -> RwLock` | 创建一个新的读写锁。 |
| **rdlock** | `rdlock(self)` | 获取共享读锁。 |
| **wrlock** | `wrlock(self)` | 获取排他写锁。 |
| **unlock** | `unlock(self)` | 释放持有的任何锁。 |

### `Semaphore` 方法

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **new** | `Semaphore::new(value: int) -> Semaphore` | 使用初始值 `value` 创建一个新的信号量。 |
| **wait** | `wait(self)` | 信号量减 1（如果为 0 则阻塞）。 |
| **post** | `post(self)` | 信号量加 1。 |
| **value** | `value(self) -> int` | 返回当前值。 |

### `Barrier` 方法

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **new** | `Barrier::new(count: int) -> Barrier` | 为 `count` 个线程创建一个新的屏障。 |
| **wait** | `wait(self) -> bool" | 在屏障处等待。为指定的领导者返回 `true`。 |

## 内存管理

所有原语都实现了 `impl Drop`，当它们超出作用域时会自动调用其内部 `free()` 方法来释放系统资源。
