+++
title = "std/encoding"
+++

# std/encoding

O módulo `std/encoding` fornece utilitários de codificação e descodificação de dados.

## Base64 (`std/encoding/base64.zc`)

Implementação da codificação Base64 (RFC 4648).

### Uso

```zc
import "std/encoding/base64.zc"

fn main() {
    let data = "Hello";
    let encoded = Base64::encode((u8*)data, 5);
    // encoded é "SGVsbG8="
}
```

### Métodos

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **encode** | `Base64::encode(data: u8*, len: usize) -> char*` | Codifica dados numa string Base64. |
| **decode** | `Base64::decode(s: char*) -> Vec<u8>` | Descodifica uma string Base64 em bytes brutos. |

## Hex (`std/encoding/hex.zc`)

Codificação e descodificação hexadecimal.

### Uso

```zc
import "std/encoding/hex.zc"

fn main() {
    let data = "Zen";
    let encoded = Hex::encode((u8*)data, 3);
    // encoded é "5a656e"
}
```

### Métodos

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **encode** | `Hex::encode(data: u8*, len: usize) -> String` | Codifica dados numa string Hex. |
| **decode** | `Hex::decode(hex: String) -> Result<Vec<u8>>` | Descodifica uma string Hex em bytes brutos. |
