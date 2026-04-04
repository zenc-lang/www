+++
title = "std/process"
+++

# std/process

`std/process` 模組提供了一個高階 API，用於衍生（spawning）子行程、執行系統指令並捕捉其輸出。

## 概覽

- **生成器模式 (Builder Pattern)**：`Command` 結構體使用流暢的生成器模式來建構指令行。
- **輸出捕捉**：輕鬆地從已完成的行程中捕捉標準輸出和結束代碼（exit codes）。
- **RAII**：`Command` 和 `Output` 都實現了 `Drop` trait，用於自動清理內部緩衝區。
- **標準互通**：無縫封裝了底層系統級的行程操作。

## 使用方法

```zc
import "std/process.zc"

fn main() {
    // 基本指令執行
    let output = Command::new("echo")
        .arg("hello world")
        .output();
        
    if (output.exit_code == 0) {
        println "捕捉到內容: {output.std_out}";
        // output.std_out 是一個 String，會自動釋放
    } else {
        println "指令失敗，結束代碼為 {output.exit_code}";
    }
}
```

## 結構體定義

### `Command`
用於配置和衍生行程的生成器。
```zc
struct Command {
    program: String;
    args: Vec<String>;
}
```

### `Output`
已完成行程執行的結果。
```zc
struct Output {
    std_out: String;
    exit_code: int;
}
```

## 方法

### `Command` 方法

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **new** | `Command::new(program: char*) -> Command` | 為指定程式建立一個新的 Command。 |
| **arg** | `arg(self, arg: char*) -> Command*` | 添加一個參數並返回指向自身的指標以進行鏈式調用。 |
| **output** | `output(self) -> Output` | 執行指令並等待完成，同時捕捉標準輸出。 |
| **status** | `status(self) -> int` | 執行指令並返回結束狀態代碼。 |

## 記憶體管理

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **free** | `free(self)` | 手動釋放內部指令指令緩衝區。 |
| **Trait** | `impl Drop for Command` | 自動清理指令緩衝區。 |
| **Trait** | `impl Drop for Output` | 自動釋放已捕捉的輸出字串。 |
