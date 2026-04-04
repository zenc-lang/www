+++
title = "std/time"
+++

# std/time

`std/time` 模組提供了高精度時間測量和執行緒掛起的工具。

## 概覽

- **毫秒精度**：`Time::now()` 返回目前系統時間（以毫秒為單位）。
- **持續時間類型**：`Duration` 結構體支持直觀的時間跨度計算。
- **簡單的工作掛起**：易於使用的掛起執行函數。
- **輕量級**：極低開銷，對標準系統級時間函數進行了封裝。

## 使用方法

```zc
import "std/time.zc"

fn main() {
    let start = Time::now();
    
    // 掛起 1.5 秒
    Time::sleep(Duration::from_ms(1500));
    
    let end = Time::now();
    println "已耗時: {end - start} ms";
}
```

## 結構體定義

### `Duration`
代表一段時間跨度。
```zc
struct Duration {
    millis: U64;
}
```

### `Time`
用於系統時間操作的靜態工具結構體。
```zc
struct Time {}
```

## 方法

### `Duration` 方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **from_ms** | `Duration::from_ms(ms: U64) -> Duration` | 從毫秒數建立一個 `Duration`。 |
| **from_secs** | `Duration::from_secs(s: U64) -> Duration` | 從秒數建立一個 `Duration`。 |

### `Time` 靜態方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **now** | `Time::now() -> U64` | 返回自紀元（epoch）以來的目前系統時間（毫秒）。 |
| **sleep** | `Time::sleep(d: Duration)` | 將目前執行緒掛起指定的 `Duration`。 |
| **sleep_ms** | `Time::sleep_ms(ms: U64)` | 將目前執行緒掛起指定的毫秒數。 |
