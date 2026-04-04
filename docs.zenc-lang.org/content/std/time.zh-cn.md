+++
title = "std/time"
+++

# std/time

`std/time` 模块提供了用于高精度时间测量和线程挂起的工具。

## 概览

- **毫秒精度**：`Time::now()` 以毫秒为单位返回当前系统时间。
- **持续时间类型**：`Duration` 结构体可用于直观的时间跨度计算。
- **简单休眠**：易于使用的函数，用于挂起执行。
- **轻量级**：开销极小，封装了标准系统级时间函数。

## 使用方法

```zc
import "std/time.zc"

fn main() {
    let start = Time::now();
    
    // 休眠 1.5 秒
    Time::sleep(Duration::from_ms(1500));
    
    let end = Time::now();
    println "已用时间: {end - start} ms";
}
```

## 结构体定义

### `Duration`
表示一段时长的间隔。
```zc
struct Duration {
    millis: U64;
}
```

### `Time`
用于系统时间操作的静态工具结构体。
```zc
struct Time {}
```

## 方法

### `Duration` 方法

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **from_ms** | `Duration::from_ms(ms: U64) -> Duration` | 从毫秒数创建一个 `Duration`。 |
| **from_secs** | `Duration::from_secs(s: U64) -> Duration" | 从秒数创建一个 `Duration`。 |

### `Time` 静态方法

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **now** | `Time::now() -> U64` | 返回自纪元（epoch）以来当前系统时间的毫秒数。 |
| **sleep** | `Time::sleep(d: Duration)` | 在指定的 `Duration` 时间内挂起当前线程。 |
| **sleep_ms** | `Time::sleep_ms(ms: U64)` | 在指定的毫秒数内挂起当前线程。 |
