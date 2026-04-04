+++
title = "std/bits"
+++

# std/bits

Il modulo `std/bits` fornisce operazioni bit a bit di basso livello, tra cui rotazioni, conteggio dei bit impostati (population count) e inversioni di bit.

## Panoramica

- **Cross-platform**: Implementa correttamente le operazioni bit a bit su diverse architetture.
- **Efficiente**: Utilizza algoritmi ottimizzati per la manipolazione dei bit.
- **Completo**: Supporta interi senza segno a 8, 16, 32, 64 e 128 bit.
- **Utilità Endianness**: Include funzioni per invertire l'ordine dei byte (endianness swapping).

## Utilizzo

```zc
import "std/bits.zc"

fn main() {
    let a: u32 = 0x80000001;
    
    // Ruota l'intero a 32 bit a sinistra di 1
    let rotated = Bits::rotl32(a, 1); // 0x00000003
    
    // Conta i bit impostati (population count)
    let count = Bits::popcount32(0b1011); // 3
    
    // Inverte l'ordine dei byte (bswap)
    let swapped = Bits::bswap32(0x12345678); // 0x78563412
}
```

## Metodi

### Rotazione Bit a Bit

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **rotl[N]** | `Bits::rotl[N](n: u[N], c: u[N]) -> u[N]` | Ruota `n` a sinistra di `c` bit (N=8, 16, 32, 64, 128). |
| **rotr[N]** | `Bits::rotr[N](n: u[N], c: u[N]) -> u[N]` | Ruota `n` a destra di `c` bit (N=8, 16, 32, 64, 128). |

### Population Count

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **popcount[N]** | `Bits::popcount[N](n: u[N]) -> u[N]` | Restituisce il numero di bit impostati (1) in `n` (N=8, 16, 32, 64, 128). |

### Conteggio Zeri Iniziali/Finali

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **clz[N]** | `Bits::clz[N](n: u[N]) -> u[N]` | Restituisce il numero di bit zero iniziali (N=8, 16, 32, 64, 128). |
| **ctz[N]** | `Bits::ctz[N](n: u[N]) -> u[N]` | Restituisce il numero di bit zero finali (N=8, 16, 32, 64, 128). |

### Byte Swap e Inversione Bit

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **bswap[N]** | `Bits::bswap[N](n: u[N]) -> u[N]` | Inverte l'ordine dei byte di `n` (N=16, 32, 64, 128). |
| **reverse_bits[N]** | `Bits::reverse_bits[N](n: u[N]) -> u[N]` | Inverte l'ordine dei bit di `n` (N=8, 16, 32, 64, 128). |
