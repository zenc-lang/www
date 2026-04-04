+++
title = "std/process"
+++

# std/process

Il modulo `std/process` fornisce un'API di alto livello per la creazione di processi figli, l'esecuzione di comandi di sistema e l'acquisizione del loro output.

## Panoramica

- **Builder Pattern**: La struct `Command` utilizza un pattern builder fluido per la costruzione delle righe di comando.
- **Acquisizione Output**: Acquisisci facilmente l'output standard e i codici di uscita dai processi terminati.
- **RAII**: Sia `Command` che `Output` implementano il trait `Drop` per la pulizia automatica dei buffer interni.
- **Interoperabilità Standard**: Involucro trasparente per la manipolazione dei processi a livello di sistema sottostante.

## Utilizzo

```zc
import "std/process.zc"

fn main() {
    // Esecuzione di base di un comando
    let output = Command::new("echo")
        .arg("hello world")
        .output();
        
    if (output.exit_code == 0) {
        println "Catturato: {output.std_out}";
        // output.std_out è una String, liberata automaticamente
    } else {
        println "Comando fallito con il codice {output.exit_code}";
    }
}
```

## Definizioni Struct

### `Command`
Un builder per configurare e avviare un processo.
```zc
struct Command {
    program: String;
    args: Vec<String>;
}
```

### `Output`
Il risultato dell'esecuzione di un processo completato.
```zc
struct Output {
    std_out: String;
    exit_code: int;
}
```

## Metodi

### Metodi di `Command`

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **new** | `Command::new(program: char*) -> Command` | Crea un nuovo `Command` per il programma specificato. |
| **arg** | `arg(self, arg: char*) -> Command*` | Aggiunge un argomento e restituisce un puntatore a se stesso per il concatenamento. |
| **output** | `output(self) -> Output` | Esegue il comando e attende il completamento, catturando lo stdout. |
| **status** | `status(self) -> int` | Esegue il comando e restituisce il codice di stato d'uscita. |

## Gestione della Memoria

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **free** | `free(self)` | Libera manualmente i buffer interni del comando. |
| **Trait** | `impl Drop for Command` | Pulisce automaticamente i buffer del comando. |
| **Trait** | `impl Drop for Output" | Libera automaticamente la stringa dell'output catturato. |
