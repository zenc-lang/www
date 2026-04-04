+++
title = "std/json"
+++

# std/json

`std/json` 模块为 Zen-C 提供了一个 DOM 风格的 JSON 解析器和生成器实现。它具有简单的 API，可用于创建、操作和序列化 JSON 数据，并支持自动内存管理。

## 概览

- **DOM 风格**：`JsonValue` 节点构成的分层树状结构。
- **类型安全访问器**：检查类型（`is_string`、`is_number`）并安全地解包值。
- **自动清理**：实现了 `Drop` trait，用于自动、递归地管理内存。
- **符合标准**：支持标准的 JSON 类型，包括对象、数组、字符串、数字、布尔值和 null。

## 使用方法

```zc
import "std/json.zc"

fn main() {
    // 构建 JSON
    let obj = JsonValue::object();
    obj.set("name", JsonValue::string("Alice"));
    obj.set("age", JsonValue::number(30.0));
    obj.set("active", JsonValue::bool(true));
    
    // 序列化
    let json_str = obj.to_string();
    println "序列化结果: {json_str}";
    
    // 解析
    let input = "{\"score\": 100}";
    match JsonValue::parse(input) {
        Ok(parsed) => {
            println "分数: {parsed.get(\"score\").unwrap().as_int().unwrap()}";
            // 'parsed' 在此代码块结束时会自动释放
        }
        Err(e) => println "错误: {e}"
    }
} // 'obj' 在此处会自动释放
```

## 结构体定义

```zc
struct JsonValue {
    kind: JsonType;
    // ... 内部字段
}
```

## 方法

### 构造

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **null** | `JsonValue::null() -> JsonValue` | 创建一个 null 值。 |
| **bool** | `JsonValue::bool(b: bool) -> JsonValue` | 创建一个布尔值。 |
| **number** | `JsonValue::number(n: double) -> JsonValue` | 创建一个数值。 |
| **string** | `JsonValue::string(s: char*) -> JsonValue` | 创建一个字符串值。 |
| **array** | `JsonValue::array() -> JsonValue` | 创建一个空的 JSON 数组。 |
| **object** | `JsonValue::object() -> JsonValue` | 创建一个空的 JSON 对象。 |

### 解析

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **parse** | `JsonValue::parse(json: char*) -> Result<JsonValue*>` | 将 JSON 字符串解析为堆分配的树状结构。 |

### 访问器

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **is_null** | `is_null(self) -> bool` | 如果类型为 null，则返回 true。 |
| **is_bool** | `is_bool(self) -> bool` | 如果类型为布尔值，则返回 true。 |
| **is_number** | `is_number(self) -> bool` | 如果类型为数字，则返回 true。 |
| **is_string** | `is_string(self) -> bool` | 如果类型为字符串，则返回 true。 |
| **is_array** | `is_array(self) -> bool` | 如果类型为数组，则返回 true。 |
| **is_object** | `is_object(self) -> bool` | 如果类型为对象，则返回 true。 |
| **as_string** | `as_string(self) -> Option<char*>` | 如果适用，返回字符串指针。 |
| **as_int** | `as_int(self) -> Option<int>` | 如果适用，返回整数值。 |
| **as_float** | `as_float(self) -> Option<double>` | 如果适用，返回数值。 |
| **as_bool** | `as_bool(self) -> Option<bool>` | 如果适用，返回布尔值。 |

### 修改

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **push** | `push(self, val: JsonValue)` | 向 JSON 数组追加一个子值。 |
| **set** | `set(self, key: char*, val: JsonValue)` | 在 JSON 对象中插入或更新键值对。 |
| **get** | `get(self, key: char*) -> Option<JsonValue*>` | 通过键从对象中检索子值。 |
| **at** | `at(self, index: usize) -> Option<JsonValue*>` | 通过索引从数组中检索子值。 |

### 序列化

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **to_string** | `to_string(self) -> String" | 返回序列化后的 JSON 字符串。 |

## 内存管理

| 方法 | 签名 | 说明 |
| :--- | :--- | :--- |
| **free** | `free(self)` | 递归释放该值及其所有后代节点。 |
| **Trait** | `impl Drop for JsonValue` | 当超出作用域时自动触发递归 `free()`。 |
