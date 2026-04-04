+++
title = "std/result"
+++

# std/result

`Result<T>` é o tipo padrão para tratamento de erros em Zen-C. Representa ou sucesso (`Ok`) contendo um valor de tipo `T`, ou falha (`Err`) contendo uma mensagem de erro em string.

## Visão Geral

- **Seguro**: Força o tratamento explícito dos caminhos de sucesso e falha.
- **Informativo**: Os casos `Err` carregam uma mensagem de erro descritiva.
- **Genérico**: Suporta qualquer tipo de valor de sucesso `T`.
- **Integrado**: Funciona perfeitamente com macros baseadas em `Result` e padrões para propagação de erro concisa.

## Uso

```zc
import "std/result.zc"

fn divide(a: int, b: int) -> Result<int> {
    if (b == 0) {
        return Result<int>::Err("Divisão por zero");
    }
    return Result<int>::Ok(a / b);
}

fn main() {
    match divide(10, 0) {
        Ok(val) => println "Resultado: {val}",
        Err(e)  => println "Erro: {e}"
    }
}
```

## Definição da Estrutura

```zc
struct Result<T> {
    is_ok: bool;
    val: T;
    err: char*;
}
```

## Métodos

### Construção

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **Ok** | `Result<T>::Ok(v: T) -> Result<T>` | Cria um resultado de sucesso contendo `v`. |
| **Err** | `Result<T>::Err(e: char*) -> Result<T>` | Cria um resultado de erro com a mensagem `e`. |

### Consulta

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **is_ok** | `is_ok(self) -> bool` | Retorna `true` se o resultado for `Ok`. |
| **is_err** | `is_err(self) -> bool` | Retorna `true` se o resultado for `Err`. |

### Extração

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **unwrap** | `unwrap(self) -> T` | Retorna o valor ok. Faz panic com a mensagem de erro se for `Err`. |
| **unwrap_ref**| `unwrap_ref(self) -> T*` | Retorna um ponteiro para o valor ok. Faz panic se for `Err`. |
| **expect** | `expect(self, msg: char*) -> T` | Retorna o valor ou faz panic com `msg` e a mensagem de erro se for `Err`. |

## Gestão de Memória

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **forget** | `forget(self)` | Zera o valor ok sem chamar destrutores ou libertar memória. |
