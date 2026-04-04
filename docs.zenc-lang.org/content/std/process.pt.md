+++
title = "std/process"
+++

# std/process

O módulo `std/process` fornece uma API de alto nível para lançar processos filhos, executar comandos do sistema e capturar a sua saída.

## Visão Geral

- **Padrão Builder**: A estrutura `Command` usa um padrão builder fluido para construir linhas de comando.
- **Captura de Saída**: Captura facilmente a saída padrão e os códigos de saída de processos terminados.
- **RAII**: Tanto `Command` como `Output` implementam o trait `Drop` para limpeza automática de buffers internos.
- **Interoperabilidade Padrão**: Envolve perfeitamente a manipulação de processos subjacente ao nível do sistema.

## Uso

```zc
import "std/process.zc"

fn main() {
    // Execução básica de comando
    let output = Command::new("echo")
        .arg("hello world")
        .output();
        
    if (output.exit_code == 0) {
        println "Capturado: {output.std_out}";
        // output.std_out é uma String, libertada automaticamente
    } else {
        println "Comando falhou com o código {output.exit_code}";
    }
}
```

## Definição de Estruturas

### `Command`
Um builder para configurar e lançar um processo.
```zc
struct Command {
    program: String;
    args: Vec<String>;
}
```

### `Output`
O resultado de uma execução de processo concluída.
```zc
struct Output {
    std_out: String;
    exit_code: int;
}
```

## Métodos

### Métodos `Command`

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **new** | `Command::new(program: char*) -> Command` | Cria um novo `Command` para o programa fornecido. |
| **arg** | `arg(self, arg: char*) -> Command*` | Adiciona um argumento e retorna um ponteiro para si mesmo para encadeamento. |
| **output** | `output(self) -> Output` | Executa o comando e aguarda a conclusão, capturando a stdout. |
| **status** | `status(self) -> int` | Executa o comando e retorna o código de estado de saída. |

## Gestão de Memória

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **free** | `free(self)` | Liberta manualmente os buffers internos do comando. |
| **Trait** | `impl Drop for Command` | Limpa automaticamente os buffers do comando. |
| **Trait** | `impl Drop for Output` | Liberta automaticamente a string de saída capturada. |
