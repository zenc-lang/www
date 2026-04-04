+++
title = "std/sys/signal"
+++

# std/sys/signal

O módulo `std/sys/signal` fornece primitivas para lidar com sinais do sistema, envolvendo a funcionalidade do `signal.h` do POSIX.

## Visão Geral

- **Interceção de Sinais**: Define handlers personalizados para sinais como `SIGINT` (Ctrl+C).
- **Terminação Graciosa**: Usa handlers de sinais para realizar a limpeza antes de sair.
- **Constantes Comuns**: Fornece definições multiplataforma para sinais padrão.

## Uso

```zc
import "std/sys/signal.zc"
import "std/io.zc"

fn on_interrupt(sig: int) {
    println "Recebido SIGINT ({sig}). A limpar...";
    exit(0);
}

fn main() {
    Signal::set_handler(Z_SIGINT, on_interrupt);
    println "À espera de Ctrl+C...";
    while(true) {}
}
```

## Definição da Estrutura

```zc
struct Signal {}
```

## Métodos

### Métodos `Signal`

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **set_handler** | `Signal::set_handler(sig: int, handler: fn*(int)) -> fn*(int)` | Regista um handler para o sinal dado e retorna o handler anterior. |

## Constantes

### Sinais Padrão
- `Z_SIGINT`: Interrupção do teclado (Ctrl+C).
- `Z_SIGILL`: Instrução ilegal.
- `Z_SIGABRT`: Sinal de aborto.
- `Z_SIGFPE`: Exceção de ponto flutuante.
- `Z_SIGSEGV`: Violação de segmentação (acesso inválido à memória).
- `Z_SIGTERM`: Sinal de terminação.
