+++
title = "std/env"
+++

# std/env

O módulo `std/env` fornece acesso multiplataforma às variáveis de ambiente do processo.

## Visão Geral

- **Acesso Chave-Valor**: API simples para obter, definir e remover variáveis de ambiente.
- **Emprestado ou Próprio**: Escolha entre `get` (retorna uma string C emprestada) e `get_dup` (retorna uma `String` própria, alocada no heap).
- **Multiplataforma**: Abstrai com segurança as chamadas de sistema subjacentes para manipulação do ambiente.

## Uso

```zc
import "std/env.zc"

fn main() {
    // Definir uma variável de ambiente
    Env::set("MY_APP_MODE", "development");

    // Obter (Emprestado)
    match Env::get("MY_APP_MODE") {
        Some(val) => println "Modo: {val}",
        None => println "Modo não definido"
    }

    // Obter (String Própria para RAII)
    match Env::get_dup("HOME") {
        Some(home) => {
             println "Home: {home}";
             // home é libertado automaticamente
        }
        None => println "HOME não encontrado"
    }
}
```

## Definição de Enum

```zc
enum EnvRes {
    OK,
    ERR,
}
```

## Métodos

### Acesso e Consulta

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **get** | `Env::get(name: char*) -> Option<char*>` | Obtém um ponteiro emprestado para uma variável de ambiente. Não libertar. |
| **get_dup** | `Env::get_dup(name: char*) -> Option<String>` | Obtém uma variável de ambiente como um novo objeto `String`. |

### Modificação

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **set** | `Env::set(name: char*, value: char*) -> EnvRes` | Define ou atualiza uma variável de ambiente. |
| **unset** | `Env::unset(name: char*) -> EnvRes` | Remove uma variável de ambiente do processo atual. |
