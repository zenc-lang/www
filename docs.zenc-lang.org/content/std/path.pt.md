+++
title = "std/path"
+++

# std/path

O módulo `std/path` fornece utilitários multiplataforma para manipular caminhos do sistema de ficheiros. Simplifica tarefas comuns como juntar caminhos, extrair extensões e encontrar diretórios pais.

## Visão Geral

- **Multiplataforma**: Lida adequadamente com barras normais e invertidas durante a manipulação.
- **Tipagem Segura**: A estrutura `Path` encapsula a informação do caminho, distinguindo-a de strings regulares.
- **Parsing Conveniente**: Extrai facilmente componentes como `extension`, `file_name`, e `parent`.
- **RAII**: A memória é gerida automaticamente via o trait `Drop`.

## Uso

```zc
import "std/path.zc"

fn main() {
    let p = Path::new("/home/user");
    let full_path = p.join("docs/file.txt");
    
    println "Caminho completo: {full_path.c_str()}";
    
    match full_path.extension() {
        Some(ext) => println "Extensão: {ext}",
        None => println "Nenhuma extensão encontrada"
    }
} // full_path e p são libertados automaticamente aqui
```

## Definição da Estrutura

```zc
struct Path {
    str: String;
}
```

## Métodos

### Construção

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **new** | `Path::new(s: char*) -> Path` | Cria um novo `Path` a partir de uma string C. |
| **from_string** | `Path::from_string(s: String) -> Path` | Cria um `Path` assumindo a titularidade de uma `String`. |
| **clone** | `clone(self) -> Path` | Retorna uma cópia profunda do `Path`. |

### Manipulação

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **join** | `join(self, other: char*) -> Path` | Anexa `other` ao caminho usando o separador de diretório correto. |

### Parsing

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **extension** | `extension(self) -> Option<String>` | Retorna a extensão do ficheiro (sem o ponto inicial), se existir. |
| **file_name** | `file_name(self) -> Option<String>` | Retorna o componente final do caminho. |
| **parent** | `parent(self) -> Option<Path>` | Retorna o caminho do diretório pai. |

### Acesso

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **c_str** | `c_str(self) -> char*` | Retorna a representação da string C subjacente. |

## Gestão de Memória

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **free** | `free(self)` | Liberta manualmente a memória da string interna do caminho. |
| **Trait** | `impl Drop for Path` | Chama automaticamente `free()` quando sai do escopo. |
