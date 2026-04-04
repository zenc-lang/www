+++
title = "std/thread"
+++

# std/thread

O módulo `std/thread` fornece primitivas de alto nível para criar e gerir threads de execução concorrentes.

## Visão Geral

- **Threads Nativas**: Usa threading subjacente ao nível do sistema (por exemplo, threads POSIX).
- **Suporte para Closures**: `Thread::spawn` pode aceitar closures Zen-C, permitindo a partilha fácil de dados entre threads.
- **Ciclo de Vida Explícito**: As threads devem ser explicitamente unidas (`join`) ou destacadas (`detach`) para garantir a limpeza adequada dos recursos.
- **Segurança**: Erros durante a criação ou manipulação de threads são reportados via `Result<bool>`.

## Uso

```zc
import "std/thread.zc"

fn worker(id: int) {
    println "Olá do worker {id}";
}

fn main() {
    // Lançamento com um closure
    let t = Thread::spawn(|| {
        worker(42);
    }).unwrap();
    
    // Esperar explicitamente pela conclusão
    t.join();
}
```

## Definições de Estruturas

### `Thread`
Representa uma alça de uma thread lançada.
```zc
struct Thread {
    handle: void*;
}
```

## Métodos

### Ciclo de Vida da `Thread`

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **spawn** | `Thread::spawn(func: fn()) -> Result<Thread>` | Lança uma nova thread executando o closure ou função fornecido. |
| **join** | `join(self) -> Result<bool>` | Bloqueia a thread atual até que a thread lançada termine. |
| **detach** | `detach(self) -> Result<bool>` | Destaca a thread, permitindo que ela corra de forma independente. Os recursos são libertados automaticamente ao sair. |
| **cancel** | `cancel(self) -> Result<bool>` | Envia um pedido de cancelamento para a thread. |

### Funções Utilitárias

| Função | Assinatura | Descrição |
| :--- | :--- | :--- |
| **sleep_ms** | `sleep_ms(ms: int)` | Suspende a execução da thread atual por aproximadamente `ms` milissegundos. |
