+++
title = "std/crypto"
+++

# std/crypto

O módulo `std/crypto` fornece primitivas criptográficas e algoritmos de hashing.

## SHA1 (`std/crypto/sha1.zc`)

Implementação do algoritmo de hashing SHA1.

### Uso

```zc
import "std/crypto/sha1.zc"

fn main() {
    let data = "Hello";
    let digest = Sha1::hash((u8*)data, 5);
    // digest.bytes é u8[20]
}
```

### Métodos

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **hash** | `Sha1::hash(data: u8*, len: usize) -> Sha1` | Calcula o hash SHA1 dos dados fornecidos. |

## SHA256 (`std/crypto/sha256.zc`)

Implementação do moderno algoritmo de hashing SHA-256 (FIPS 180-4).

### Uso

```zc
import "std/crypto/sha256.zc"

fn main() {
    let hash = Sha256::hash("hello world");
    // hash é uma string hexadecimal
}
```

### Métodos

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **hash** | `Sha256::hash(data: char*) -> String` | Calcula o hash SHA-256 da string fornecida e retorna-o como uma string Hex. |
