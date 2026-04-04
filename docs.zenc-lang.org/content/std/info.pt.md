+++
title = "std/sys/info"
+++

# std/sys/info

O módulo `std/sys/info` fornece utilitários para recuperar a identificação e informações do sistema, cobrindo o `uname` do POSIX.

## Visão Geral

- **Identificação do Sistema**: Acede ao nome do SO, versão do kernel, arquitetura de hardware e muito mais.
- **Conformidade com RAII**: A estrutura `Uname` gira automaticamente a memória para as suas strings internas.

## Uso

```zc
import "std/sys/info.zc"
import "std/io.zc"

fn main() {
    let info = SysInfo::get_uname();
    println "SO: {info.sysname}";
    println "Kernel: {info.release}";
    println "Arq: {info.machine}";
}
```

## Definição da Estrutura

### `Uname`
Contém campos de identificação do sistema.
```zc
struct Uname {
    sysname: String;
    nodename: String;
    release: String;
    version: String;
    machine: String;
}
```

## Métodos

### Métodos `SysInfo`

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **get_uname** | `SysInfo::get_uname() -> Uname` | Retorna uma estrutura `Uname` contendo várias strings do sistema. |

## Gestão de Memória
- `Uname` implementa `impl Drop` e libertará automaticamente os seus buffers `String` internos quando sair do escopo.
