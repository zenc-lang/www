+++
title = "std/bits"
+++

# std/bits

O módulo `std/bits` fornece operações bit a bit de baixo nível, incluindo rotações, contagens de população e inversões de bits.

## Visão Geral

- **Multiplataforma**: Implementa corretamente operações bit a bit em diferentes arquiteturas.
- **Eficiente**: Usa algoritmos de manipulação de bits otimizados.
- **Abrangente**: Suporta inteiros sem sinal de 8, 16, 32, 64 e 128 bits.
- **Utilitários de Endianness**: Inclui funções para inverter a ordem dos bytes (troca de endianness).

## Uso

```zc
import "std/bits.zc"

fn main() {
    let a: u32 = 0x80000001;
    
    // Rodar inteiro de 32 bits para a esquerda por 1
    let rotated = Bits::rotl32(a, 1); // 0x00000003
    
    // Contar bits definidos (population count)
    let count = Bits::popcount32(0b1011); // 3
    
    // Inverter ordem dos bytes (bswap)
    let swapped = Bits::bswap32(0x12345678); // 0x78563412
}
```

## Métodos

### Rotação Bit a Bit

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **rotl[N]** | `Bits::rotl[N](n: u[N], c: u[N]) -> u[N]` | Roda `n` para a esquerda por `c` bits (N=8, 16, 32, 64, 128). |
| **rotr[N]** | `Bits::rotr[N](n: u[N], c: u[N]) -> u[N]` | Roda `n` para a direita por `c` bits (N=8, 16, 32, 64, 128). |

### Contagem de População

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **popcount[N]** | `Bits::popcount[N](n: u[N]) -> u[N]` | Retorna o número de bits definidos (1s) em `n` (N=8, 16, 32, 64, 128). |

### Contagem de Zeros à Direita/Esquerda

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **clz[N]** | `Bits::clz[N](n: u[N]) -> u[N]` | Retorna o número de bits zero à esquerda (N=8, 16, 32, 64, 128). |
| **ctz[N]** | `Bits::ctz[N](n: u[N]) -> u[N]` | Retorna o número de bits zero à direita (N=8, 16, 32, 64, 128). |

### Troca de Bytes e Inversão de Bits

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **bswap[N]** | `Bits::bswap[N](n: u[N]) -> u[N]` | Inverte a ordem dos bytes de `n` (N=16, 32, 64, 128). |
| **reverse_bits[N]** | `Bits::reverse_bits[N](n: u[N]) -> u[N]` | Inverte a ordem dos bits de `n` (N=8, 16, 32, 64, 128). |
