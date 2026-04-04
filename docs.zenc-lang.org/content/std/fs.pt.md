+++
title = "std/fs"
+++

# std/fs

O módulo `std/fs` fornece uma API abrangente para interagir com o sistema de ficheiros, incluindo E/S de ficheiros, manipulação de diretórios e recuperação de metadados.

## Visão Geral

- **Manipuladores Seguros**: A estrutura `File` fornece uma cobertura segura em torno dos manipuladores de ficheiros brutos.
- **RAII**: Os manipuladores de ficheiros são fechados automaticamente quando saem do escopo via o trait `Drop`.
- **Tratamento de Erros**: Usa `Result<T>` para todas as operações que podem falhar, fornecendo mensagens de erro descritivas.
- **Conveniência**: Inclui métodos estáticos para tarefas comuns como ler ou escrever um ficheiro inteiro numa única chamada.

## Uso

```zc
import "std/fs.zc"

fn main() {
    // Leitura básica de ficheiro usando RAII
    match File::read_all("config.txt") {
        Ok(content) => println "Config: {content}",
        Err(e) => println "Erro ao ler config: {e}"
    }
    
    // Manipulador de ficheiro explícito com fecho automático
    match File::open("data.log", "a") {
        Ok(file) => {
            file.write_string("Log entry\n");
            // file é fechado automaticamente aqui
        }
        Err(e) => println "Falha ao abrir log: {e}"
    }
}
```

## Definição de Estruturas

### `File`
Representa um manipulador de ficheiro aberto.
```zc
struct File {
    handle: void*;
}
```

### `Metadata`
Metadados de ficheiro ou diretório.
```zc
struct Metadata {
    size: U64;
    is_dir: bool;
    is_file: bool;
}
```

### `DirEntry`
Representa uma entrada num diretório.
```zc
struct DirEntry {
    name: String;
    is_dir: bool;
}
```

## Métodos

### Abrir / Fechar

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **open** | `File::open(path: char*, mode: char*) -> Result<File>` | Abre um ficheiro em `path` com `mode`. |
| **close** | `close(self)` | Fecha explicitamente o manipulador de ficheiro. |

### Ler / Escrever

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **read_to_string** | `read_to_string(self) -> Result<String>` | Lê o ficheiro inteiro para uma `String`. |
| **read_all** | `File::read_all(path: char*) -> Result<String>` | Utilitário estático para ler um ficheiro completamente. |
| **read_lines** | `File::read_lines(path: char*) -> Result<Vec<String>>` | Utilitário estático para ler um ficheiro para um vetor de linhas. |
| **write_string** | `write_string(self, content: char*) -> Result<bool>` | Escreve uma string no ficheiro. |
| **write_lines** | `File::write_lines(path: char*, lines: Vec<String>*) -> Result<bool>` | Utilitário estático para escrever um vetor de linhas num ficheiro. |

### Utilitários de Caminho

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **exists** | `File::exists(path: char*) -> bool` | Retorna verdadeiro se o caminho existir. |
| **current_dir** | `File::current_dir() -> Result<String>` | Retorna o caminho absoluto do diretório de trabalho atual. |
| **metadata** | `File::metadata(path: char*) -> Result<Metadata>` | Recupera metadados para o caminho especificado. |

### Operações de Ficheiros e Diretórios

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **create_dir** | `File::create_dir(path: char*) -> Result<bool>` | Cria um novo diretório. |
| **remove_file** | `File::remove_file(path: char*) -> Result<bool>` | Elimina o ficheiro especificado. |
| **remove_dir** | `File::remove_dir(path: char*) -> Result<bool>` | Elimina o diretório especificado (deve estar vazio). |
| **read_dir** | `File::read_dir(path: char*) -> Result<Vec<DirEntry>>` | Retorna uma lista de entradas num diretório. |

## Gestão de Memória

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **Trait** | `impl Drop for File` | Fecha automaticamente o manipulador de ficheiro quando sai do escopo. |
