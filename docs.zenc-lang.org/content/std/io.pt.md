+++
title = "std/io"
+++

# std/io

O módulo `std/io` fornece funcionalidade de entrada/saída padrão, incluindo impressão formatada para stdout e leitura robusta de stdin.

## Visão Geral

- **Saída Formatada**: Fornece `print` e `println` com suporte para especificadores de formato estilo C (`%s`, `%d`, etc.).
- **Formatação de Strings**: Múltiplas opções para formatar em buffers estáticos, fornecidos pelo utilizador ou alocados no heap.
- **Consciente de Unicode**: Inclui `read_rune` para ler caracteres UTF-8 individuais de stdin.
- **Utilitários de Conversão**: Métodos simples para converter inteiros e runes em strings.

## Uso

```zc
import "std/io.zc"

fn main() {
    // Impressão básica
    println("Olá, %s!", "Zen-C");
    
    // Ler uma linha de entrada
    print("Introduza o seu nome: ");
    autofree let name = readln();
    
    if name != NULL {
        println("Saudações, %s", name);
    }
}
```

## Métodos

### Saída

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **print** | `print(fmt: char*, ...) -> int` | Imprime a saída formatada para stdout. |
| **println** | `println(fmt: char*, ...) -> int` | Imprime a saída formatada para stdout seguida por uma nova linha. |

### Entrada

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **readln** | `readln() -> char*` | Lê uma linha de stdin. Retorna uma string alocada no heap (o chamador deve libertar). |
| **read_rune**| `read_rune() -> rune` | Lê um único caractere UTF-8 (rune) de stdin. |

### Formatação

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **format** | `format(fmt: char*, ...) -> char*` | Formata num buffer estático interno. **Aviso**: Não é thread-safe. |
| **format_into**| `format_into(buf: char*, size: usize, fmt: char*, ...) -> int` | Formata num buffer fornecido pelo utilizador de tamanho específico. |
| **format_new** | `format_new(fmt: char*, ...) -> char*` | Formata num novo buffer alocado no heap. O chamador deve libertar. |

### Conversão

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **itos** | `itos(n: int) -> char*` | Converte `n` para uma string num buffer estático. |
| **itos_new** | `itos_new(n: int) -> char*` | Converte `n` para uma string alocada no heap. |
| **utos** | `utos(n: uint) -> char*` | Converte `n` sem sinal para uma string num buffer estático. |
