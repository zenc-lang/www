+++
title = "std/core"
+++

# std/core

O módulo `std/core` fornece as definições mais fundamentais e primitivas de tratamento de erros para programas Zen-C. É implicitamente exigido pela maioria das outras bibliotecas padrão.

## Visão Geral

- **Cabeçalhos Padrão**: Inclui cabeçalhos C críticos como `stdlib.h`, `stdio.h`, e `stdbool.h`.
- **Mecanismo de Panic**: Fornece o macro `panic` para relatórios de erros irrecuperáveis.
- **Controlo de Processos**: Inclui funções básicas de controlo de processos como `exit`.

## Métodos

### Tratamento de Erros

| Método/Macro | Assinatura | Descrição |
| :--- | :--- | :--- |
| **panic** | `panic(msg: char*)` | Imprime uma mensagem de erro formatada incluindo ficheiro, linha e função, e termina o processo. |

### Controlo de Processos

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **exit** | `exit(code: int)` | Termina imediatamente o processo com o código de retorno fornecido. |
