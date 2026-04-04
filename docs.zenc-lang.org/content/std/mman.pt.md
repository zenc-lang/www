+++
title = "std/sys/mman"
+++

# std/sys/mman

O módulo `std/sys/mman` fornece uma interface Zen-C para funções de mapeamento de memória e proteção, envolvendo o `sys/mman.h` do POSIX.

## Visão Geral

- **Mapeamento de Memória**: Mapeia ficheiros ou memória anónima no espaço de endereçamento do processo.
- **Controlo de Proteção**: Altera dinamicamente as permissões da região de memória (Leitura, Escrita, Execução).
- **Memória Anónima**: Aloca grandes blocos de memória diretamente do SO sem um ficheiro.

## Uso

```zc
import "std/sys/mman.zc"
import "std/io.zc"

fn main() {
    let size: usize = 4096;
    let prot = Z_PROT_READ | Z_PROT_WRITE;
    let flags = Z_MAP_PRIVATE | Z_MAP_ANONYMOUS;
    
    let addr = Memory::mmap(size, prot, flags);
    if ((isize)addr == Z_MAP_FAILED) {
        println "Falha no mapeamento";
        return;
    }
    
    // Usar memória...
    
    Memory::munmap(addr, size);
}
```

## Definição da Estrutura

```zc
struct Memory {}
```

## Métodos

### Métodos `Memory`

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **mmap** | `Memory::mmap(len: usize, prot: int, flags: int) -> void*` | Cria um novo mapeamento no espaço de endereços virtuais do processo chamador. |
| **munmap** | `Memory::munmap(addr: void*, len: usize) -> bool` | Elimina os mapeamentos para o intervalo de endereços especificado. Retorna `true` em caso de sucesso. |
| **mprotect** | `Memory::mprotect(addr: void*, len: usize, prot: int) -> bool` | Altera as proteções de acesso para as páginas de memória do processo chamador. Retorna `true` em caso de sucesso. |

## Constantes

### Flags de Proteção
- `Z_PROT_NONE`: A página não pode ser acedida.
- `Z_PROT_READ`: A página pode ser lida.
- `Z_PROT_WRITE`: A página pode ser escrita.
- `Z_PROT_EXEC`: A página pode ser executada.

### Flags de Visibilidade
- `Z_MAP_SHARED`: Partilha este mapeamento.
- `Z_MAP_PRIVATE`: Cria um mapeamento privado de cópia na escrita (copy-on-write).
- `Z_MAP_ANONYMOUS`: O mapeamento não é suportado por nenhum ficheiro.

### Valores de Erro
- `Z_MAP_FAILED`: Retornado por `mmap` em caso de erro.
