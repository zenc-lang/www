+++
title = "std/sync"
+++

# std/sync

`std/sync` 模組提供了一套全面的同步原語，用於管理對共享數據的並行存取以及協調執行緒執行。

## 概覽

- **標準原語**：包括 `Mutex`、`CondVar`、`RwLock`、`Once`、`Semaphore` 和 `Barrier`。
- **RAII 整合**：所有原語都實現了 `Drop` trait，確保系統資源（如 pthread 句柄）會自動釋放。
- **跨平台**：安全地抽象了平台特定的差異（例如在 macOS 上通過 mutexes/condvars 實現 `Barrier` 和 `Semaphore`）。
- **高效力**：對經優化的系統級同步庫的薄封裝。

## 使用方法

```zc
import "std/sync.zc"

fn main() {
    let m = Mutex::new();
    
    // 作用域鎖 (RAII)
    {
        m.lock();
        // 關鍵區域 (Critical section)
        m.unlock();
    } // 如果 m 是最後一個擁有者，則會在此處自動釋放
    
    // 一次性初始化
    let once = Once::new();
    once.call(|| {
        println "已初始化！";
    });
}
```

## 結構體定義

### `Mutex`
用於保護共享數據的互斥鎖。

### `CondVar`
用於根據狀態變化在執行緒之間發送訊號的條件變數。

### `RwLock`
讀寫鎖，允許多個並行讀取者，但僅允許一個寫入者。

### `Once`
確保特定的初始化代碼僅執行一次。

### `Semaphore`
計數訊號量，用於控制對資源池的存取。

### `Barrier`
同步點，多個執行緒必須在此等待，直到達到指定數量的執行緒到達。

## 方法

### `Mutex` 方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **new** | `Mutex::new() -> Mutex` | 建立一個新的互斥鎖。 |
| **lock** | `lock(self)` | 獲取鎖（阻塞）。 |
| **try_lock** | `try_lock(self) -> bool` | 嘗試不阻塞地獲取鎖。 |
| **unlock** | `unlock(self)` | 釋放鎖。 |

### `CondVar` 方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **new** | `CondVar::new() -> CondVar` | 建立一個新的條件變數。 |
| **wait** | `wait(self, mutex: Mutex*)` | 阻塞執行緒直到收到訊號，暫時釋放互斥鎖。 |
| **signal** | `signal(self)` | 喚醒一個等待此條件的執行緒。 |
| **broadcast**| `broadcast(self)` | 喚醒所有等待此條件的執行緒。 |

### `RwLock` 方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **new** | `RwLock::new() -> RwLock` | 建立一個新的讀寫鎖。 |
| **rdlock** | `rdlock(self)` | 獲取共享讀鎖。 |
| **wrlock** | `wrlock(self)` | 獲取排他寫鎖。 |
| **unlock** | `unlock(self)` | 釋放持有的任何鎖。 |

### `Semaphore` 方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **new** | `Semaphore::new(value: int) -> Semaphore` | 建立一個帶有初始 `value` 的新訊號量。 |
| **wait** | `wait(self)` | 遞減訊號量（如果為 0 則阻塞）。 |
| **post** | `post(self)` | 遞增訊號量。 |
| **value** | `value(self) -> int` | 返回目前值。 |

### `Barrier` 方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **new** | `Barrier::new(count: int) -> Barrier` | 為 `count` 個執行緒建立一個新的屏障。 |
| **wait** | `wait(self) -> bool` | 在屏障處等待。指定的負責執行緒返回 `true`。 |

## 記憶體管理

所有原語均實現了 `impl Drop`，並且在超出作用域時會自動呼叫其內部的 `free()` 方法以釋放系統資源。
