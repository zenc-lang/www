+++
title = "std/sync"
+++

# std/sync

O módulo `std/sync` fornece um conjunto abrangente de primitivas de sincronização para gerir o acesso concorrente a dados partilhados e coordenar a execução de threads.

## Visão Geral

- **Primitivas Padrão**: Inclui `Mutex`, `CondVar`, `RwLock`, `Once`, `Semaphore`, e `Barrier`.
- **Integração RAII**: Todas as primitivas implementam o trait `Drop`, garantindo que os recursos do sistema (como alças de pthread) sejam libertados automaticamente.
- **Multiplataforma**: Abstrai com segurança as peculiaridades de cada plataforma (por exemplo, implementando `Barrier` e `Semaphore` via mutexes/condvars no macOS).
- **Eficiência**: Coberturas finas em torno de bibliotecas de sincronização otimizadas ao nível do sistema.

## Uso

```zc
import "std/sync.zc"

fn main() {
    let m = Mutex::new();
    
    // Bloqueio com escopo (RAII)
    {
        m.lock();
        // Secção crítica
        m.unlock();
    } // m é libertado automaticamente se fosse o último proprietário
    
    // Inicialização de uma única vez
    let once = Once::new();
    once.call(|| {
        println "Inicializado!";
    });
}
```

## Definições de Estruturas

### `Mutex`
Um bloqueio de exclusão mútua para proteger dados partilhados.

### `CondVar`
Uma variável de condição para sinalização entre threads baseada em alterações de estado.

### `RwLock`
Um bloqueio de leitor-escritor que permite múltiplos leitores simultâneos, mas apenas um escritor.

### `Once`
Garante que um pedaço específico de código de inicialização seja executado exatamente uma vez.

### `Semaphore`
Um semáforo de contagem para controlar o acesso a um pool de recursos.

### `Barrier`
Um ponto de sincronização onde múltiplas threads devem esperar até que um número específico tenha chegado.

## Métodos

### Métodos `Mutex`

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **new** | `Mutex::new() -> Mutex` | Cria um novo mutex. |
| **lock** | `lock(self)` | Adquire o bloqueio (bloqueia). |
| **try_lock** | `try_lock(self) -> bool` | Tenta adquirir o bloqueio sem bloquear. |
| **unlock** | `unlock(self)` | Liberta o bloqueio. |

### Métodos `CondVar`

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **new** | `CondVar::new() -> CondVar` | Cria uma nova variável de condição. |
| **wait** | `wait(self, mutex: Mutex*)` | Bloqueia a thread até ser sinalizada, libertando o mutex temporariamente. |
| **signal** | `signal(self)` | Acorda uma thread que esteja à espera nesta condição. |
| **broadcast**| `broadcast(self)` | Acorda todas as threads que estejam à espera nesta condição. |

### Métodos `RwLock`

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **new** | `RwLock::new() -> RwLock` | Cria um novo bloqueio de leitor-escritor. |
| **rdlock** | `rdlock(self)` | Adquire um bloqueio de leitura partilhado. |
| **wrlock** | `wrlock(self)` | Adquire um bloqueio de escrita exclusivo. |
| **unlock** | `unlock(self)` | Liberta qualquer bloqueio detido. |

### Métodos `Semaphore`

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **new** | `Semaphore::new(value: int) -> Semaphore` | Cria um novo semáforo com o `value` inicial. |
| **wait** | `wait(self)` | Decrementa o semáforo (bloqueia se for 0). |
| **post** | `post(self)` | Incrementa o semáforo. |
| **value** | `value(self) -> int` | Retorna o valor atual. |

### Métodos `Barrier`

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **new** | `Barrier::new(count: int) -> Barrier` | Cria uma nova barreira para `count` threads. |
| **wait** | `wait(self) -> bool` | Espera na barreira. Retorna `true` para o líder designado. |

## Gestão de Memória

Todas as primitivas implementam `impl Drop` e chamarão automaticamente o seu método `free()` interno para libertar recursos do sistema quando saírem do escopo.
