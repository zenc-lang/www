+++
title = "std/process"
+++

# std/process

`std/process` 模块提供了用于生成子进程、执行系统命令并捕获其输出的高级 API。

## 概览

- **构建者模式**：`Command` 结构体使用流利构建者 (fluent builder) 模式来构造命令行。
- **输出捕获**：轻松从运行结束的进程中捕获标准输出和退出码。
- **RAII**：`Command` 和 `Output` 都实现了 `Drop` trait，以自动清理内部缓冲区。
- **标准互操作**：无缝封装底层的系统级进程操作。

## 使用方法

```zc
import "std/process.zc"

fn main() {
    // 基本命令执行
    let output = Command::new("echo")
        .arg("hello world")
        .output();
        
    if (output.exit_code == 0) {
        println "捕获内容: {output.std_out}";
        // output.std_out 是一个 String，会自动释放
    } else {
        println "命令执行失败，退出码为 {output.exit_code}";
    }
}
```

## 结构体定义

### `Command`
用于配置和生成进程的构建者。
```zc
struct Command {
    program: String;
    args: Vec<String>;
}
```

### `Output`
已完成进程执行的结果。
```zc
struct Output {
    std_out: String;
    exit_code: int;
}
```

## 方法

### `Command` 方法

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **new** | `Command::new(program: char*) -> Command` | 为给定程序创建一个新的 Command。 |
| **arg** | `arg(self, arg: char*) -> Command*` | 添加一个参数并返回指向自身的指针，以便链式调用。 |
| **output** | `output(self) -> Output` | 执行命令并等待完成，同时捕获标准输出。 |
| **status** | `status(self) -> int" | 执行命令并返回退出状态码。 |

## 内存管理

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **free** | `free(self)` | 手动释放内部命令缓冲区。 |
| **Trait** | `impl Drop for Command` | 自动清理命令缓冲区. |
| **Trait** | `impl Drop for Output` | 自动释放捕获的输出字符串。 |
