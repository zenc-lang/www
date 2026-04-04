+++
title = "std/sys/user"
+++

# std/sys/user

O módulo `std/sys/user` fornece acesso a informações de identificação de utilizador e grupo, envolvendo o `unistd.h` do POSIX.

## Visão Geral

- **Identidade do Utilizador**: Recupera IDs de Utilizador (UID) e IDs de Grupo (GID) reais e efetivos.
- **Contexto do Processo**: Útil para verificação de privilégios e gestão de permissões em utilitários do sistema.

## Uso

```zc
import "std/sys/user.zc"
import "std/io.zc"

fn main() {
    println "UID Atual: {User::get_uid()}";
    println "GID Atual: {User::get_gid()}";
    
    if (User::get_euid() == 0) {
        println "A executar com privilégios de root.";
    }
}
```

## Definição da Estrutura

```zc
struct User {}
```

## Métodos

### Métodos `User`

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **get_uid** | `User::get_uid() -> u32` | Retorna o ID de Utilizador real do processo atual. |
| **get_gid** | `User::get_gid() -> u32` | Retorna o ID de Grupo real do processo atual. |
| **get_euid** | `User::get_euid() -> u32` | Retorna o ID de Utilizador efetivo. |
| **get_egid** | `User::get_egid() -> u32` | Retorna o ID de Grupo efetivo. |
