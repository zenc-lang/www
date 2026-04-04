+++
title = "std/json"
+++

# std/json

`std/json` 模組為 Zen-C 提供了一個 DOM 風格的 JSON 解析器和生成器實現。它具有簡單的 API，可用於建立、操作和序列化（serialize）JSON 數據，並支援自動記憶體管理。

## 概覽

- **DOM 風格**：由 `JsonValue` 節點組成的分層樹狀結構。
- **類型安全存取器**：檢查類型（`is_string`、`is_number`）並安全地解包（unwrap）數值。
- **自動清理**：實現了 `Drop` trait，用於自動、遞迴的記憶體管理。
- **符合標準**：支援標準 JSON 類型，包括物件、陣列、字串、數字、布林值和 null。

## 使用方法

```zc
import "std/json.zc"

fn main() {
    // 建立 JSON
    let obj = JsonValue::object();
    obj.set("name", JsonValue::string("Alice"));
    obj.set("age", JsonValue::number(30.0));
    obj.set("active", JsonValue::bool(true));
    
    // 序列化
    let json_str = obj.to_string();
    println "序列化結果: {json_str}";
    
    // 解析
    let input = "{\"score\": 100}";
    match JsonValue::parse(input) {
        Ok(parsed) => {
            println "分數: {parsed.get(\"score\").unwrap().as_int().unwrap()}";
            // parsed 在此區塊結束時會自動釋放
        }
        Err(e) => println "錯誤: {e}"
    }
} // obj 在此處自動釋放
```

## 結構體定義

```zc
struct JsonValue {
    kind: JsonType;
    // ... 內部欄位
}
```

## 方法

### 構造

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **null** | `JsonValue::null() -> JsonValue` | 建立一個 null 值。 |
| **bool** | `JsonValue::bool(b: bool) -> JsonValue` | 建立一個布林值。 |
| **number** | `JsonValue::number(n: double) -> JsonValue` | 建立一個數值。 |
| **string** | `JsonValue::string(s: char*) -> JsonValue` | 建立一個字串值。 |
| **array** | `JsonValue::array() -> JsonValue` | 建立一個空的 JSON 陣列。 |
| **object** | `JsonValue::object() -> JsonValue` | 建立一個空的 JSON 物件。 |

### 解析

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **parse** | `JsonValue::parse(json: char*) -> Result<JsonValue*>` | 將 JSON 字串解析為堆分配（heap-allocated）的樹狀結構。 |

### 存取器

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **is_null** | `is_null(self) -> bool` | 如果類型為 null 則返回 true。 |
| **is_bool** | `is_bool(self) -> bool` | 如果類型為布林值則返回 true。 |
| **is_number** | `is_number(self) -> bool` | 如果類型為數值則返回 true。 |
| **is_string** | `is_string(self) -> bool` | 如果類型為字串則返回 true。 |
| **is_array** | `is_array(self) -> bool` | 如果類型為陣列則返回 true。 |
| **is_object** | `is_object(self) -> bool` | 如果類型為物件則返回 true。 |
| **as_string** | `as_string(self) -> Option<char*>` | 如果適用，則返回字串指標。 |
| **as_int** | `as_int(self) -> Option<int>` | 如果適用，則返回整數值。 |
| **as_float** | `as_float(self) -> Option<double>` | 如果適用，則返回浮點數值。 |
| **as_bool** | `as_bool(self) -> Option<bool>` | 如果適用，則返回布林值。 |

### 修改

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **push** | `push(self, val: JsonValue)` | 向 JSON 陣列追加子值。 |
| **set** | `set(self, key: char*, val: JsonValue)` | 在 JSON 物件中插入或更新鍵值對。 |
| **get** | `get(self, key: char*) -> Option<JsonValue*>` | 根據鍵（key）從物件中檢索子值。 |
| **at** | `at(self, index: usize) -> Option<JsonValue*>` | 根據索引從陣列中檢索子值。 |

### 序列化

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **to_string** | `to_string(self) -> String` | 返回序列化後的 JSON 字串。 |

## 記憶體管理

| 方法 | 簽名 | 說明 |
| :--- | :--- | :--- |
| **free** | `free(self)` | 遞迴釋放該值及其所有後代節點。 |
| **Trait** | `impl Drop for JsonValue` | 出作用域時自動觸發遞迴的 `free()`。 |
