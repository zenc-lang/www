+++
title = "std/simd"
+++

# std/simd

Zen-C fornece tipos de vetores SIMD (Single Instruction, Multiple Data) nativos que compilam diretamente para instruções de vetores otimizadas por hardware (SSE, AVX, NEON, etc.) suportadas pelo backend de destino.

## Visão Geral

- **Desempenho Nativo**: Utiliza extensões de vetores LLVM/GCC para máxima eficiência.
- **Implicitamente Portátil**: Tipos como `f32x4` mapeiam para o melhor hardware de 128 bits disponível específico da arquitetura.
- **Aritmética por Elemento**: Operadores padrão (`+`, `-`, `*`, `/`) aplicam-se a todos os canais (lanes) simultaneamente.
- **Broadcasting**: A inicialização com um único valor distribui-o por todos os canais.

## Uso

```zc
import "std/simd.zc"

fn main() {
    // Inicialização (Canais explícitos)
    let a = f32x4 { 1.0, 2.0, 3.0, 4.0 };
    
    // Broadcasting (Valor único para todos os canais)
    let b = f32x4 { v: 2.0 };
    
    // Adição por elemento
    let c = a + b;   // Resultado: { 3.0, 4.0, 5.0, 6.0 }
    
    // Acesso ao Canal
    let first = c[0];
}
```

## Tipos de Vetores

A biblioteca padrão define vários tipos de vetores de 128 bits e 256 bits. Também pode definir os seus próprios usando o atributo `@vector(N)`.

### Vetores de 128 bits (SSE / NEON)

| Tipo | Tipo de Elemento | Canais | Tamanho em Bytes |
| :--- | :--- | :--- | :--- |
| `f32x4` | `f32` | 4 | 16 |
| `f64x2` | `f64` | 2 | 16 |
| `i32x4` | `i32` | 4 | 16 |
| `u32x4` | `u32` | 4 | 16 |
| `i64x2` | `i64` | 2 | 16 |
| `u64x2` | `u64` | 2 | 16 |
| `i16x8` | `i16` | 8 | 16 |
| `u16x8` | `u16` | 8 | 16 |
| `i8x16` | `i8` | 16 | 16 |
| `u8x16` | `u8` | 16 | 16 |

### Vetores de 256 bits (AVX / AVX2)

| Tipo | Tipo de Elemento | Canais | Tamanho em Bytes |
| :--- | :--- | :--- | :--- |
| `f32x8` | `f32` | 8 | 32 |
| `f64x4` | `f64` | 4 | 32 |
| `i32x8` | `i32` | 8 | 32 |
| `u32x8` | `u32` | 8 | 32 |
| `i64x4` | `i64` | 4 | 32 |
| `u64x4` | `u64` | 4 | 32 |
| `i16x16` | `i16` | 16 | 32 |
| `u16x16` | `u16` | 16 | 32 |
| `i8x32` | `i8` | 32 | 32 |
| `u8x32` | `u8` | 32 | 32 |

## Operações

| Categoria | Operador | Descrição |
| :--- | :--- | :--- |
| **Aritmética** | `+`, `-`, `*`, `/` | Adição, subtração, multiplicação e divisão padrão por elemento. |
| **Bitwise** | `&`, `\|`, `^`, `~` | AND, OR, XOR e NOT bitwise em todos os canais. |
| **Indexação** | `[i]` | Acede ou modifica canais individuais por índice. |
| **Comparação** | `==`, `!=`, `<`, `>` | Retorna um vetor de máscara booleana (os resultados variam por backend). |
