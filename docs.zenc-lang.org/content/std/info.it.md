+++
title = "std/sys/info"
+++

# std/sys/info

Il modulo `std/sys/info` fornisce utilità per il recupero dell'identificazione e delle informazioni di sistema, come wrapper per `uname` di POSIX.

## Panoramica

- **Identificazione del Sistema**: Accesso al nome del sistema operativo, alla versione del kernel, all'architettura hardware e altro ancora.
- **Conformità RAII**: La struct `Uname` gestisce automaticamente la memoria per le sue stringhe interne.

## Utilizzo

```zc
import "std/sys/info.zc"
import "std/io.zc"

fn main() {
    let info = SysInfo::get_uname();
    println "SO: {info.sysname}";
    println "Kernel: {info.release}";
    println "Arch: {info.machine}";
}
```

## Definizione Struct

### `Uname`
Contiene i campi di identificazione del sistema.
```zc
struct Uname {
    sysname: String;
    nodename: String;
    release: String;
    version: String;
    machine: String;
}
```

## Metodi

### Metodi di `SysInfo`

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **get_uname** | `SysInfo::get_uname() -> Uname` | Restituisce una struct `Uname` contenente varie stringhe di sistema. |

## Gestione della Memoria
- `Uname` implementa `impl Drop` e libererà automaticamente i suoi buffer `String` interni quando esce dallo scope.
