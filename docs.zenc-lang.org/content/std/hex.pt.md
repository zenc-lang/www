+++
title = "std/encoding/hex"
+++

# std/encoding/hex

O módulo `std/encoding/hex` fornece utilitários para codificação e descodificação hexadecimal de dados.

## Visão Geral

- **Codificação**: Converte bytes brutos numa string hexadecimal.
- **Descodificação**: Converte uma string hexadecimal de volta para bytes brutos (`Vec<u8>`).

## Uso

```zc
import "std/encoding/hex.zc"
import "std/io.zc"

fn main() {
    let data = "Hello";
    let encoded = Hex::encode((u8*)data, 5);
    println "Hex: {encoded}"; // 48656c6c6f
    
    let decoded_res = Hex::decode(encoded);
    if (decoded_res.is_ok()) {
        let bytes = decoded_res.unwrap();
        // Usar bytes...
    }
}
```

## Definição da Estrutura

```zc
struct Hex {}
```

## Métodos

### Métodos `Hex`

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **encode** | `Hex::encode(data: u8*, len: usize) -> String` | Codifica dados brutos numa string hexadecimal. |
| **decode** | `Hex::decode(hex: String) -> Result<Vec<u8>>` | Descodifica uma string hexadecimal num `Vec<u8>`. |
