+++
title = "std/sys/stat"
+++

# std/sys/stat

Il modulo `std/sys/stat` fornisce un'interfaccia per il recupero dei metadati estesi dei file e delle informazioni sullo stato, come wrapper di `sys/stat.h` di POSIX.

## Panoramica

- **Metadati del File**: Recupera la dimensione del file, la modalità (permessi) e i timestamp.
- **Timestamp**: Accesso alle date di accesso, modifica e cambiamento come timestamp Unix.
- **Controllo del Tipo**: Metodi helper per determinare se una modalità rappresenta un file o una directory.

## Utilizzo

```zc
import "std/sys/stat.zc"
import "std/io.zc"

fn main() {
    let res = FileStat::stat("myfile.txt");
    if (res.is_some()) {
        let st = res.unwrap();
        println "Dimensione: {st.size} byte";
        println "Permessi: {st.mode}";
        
        if (FileStat::is_dir(st.mode)) {
            println "È una directory.";
        }
    }
}
```

## Definizione Struct

### `Stat`
Contiene metadati dei file in stile Unix.
```zc
struct Stat {
    mode: u32;
    size: u64;
    atime: i64;
    mtime: i64;
    ctime: i64;
    uid: u32;
    gid: u32;
}
```

## Metodi

### Metodi di `FileStat`

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **stat** | `FileStat::stat(path: char*) -> Option<Stat>` | Restituisce i metadati per il percorso dato, o `None` in caso di errore. |
| **is_dir** | `FileStat::is_dir(mode: u32) -> bool` | Controlla se la modalità data rappresenta una directory. |
| **is_file** | `FileStat::is_file(mode: u32) -> bool` | Controlla se la modalità data rappresenta un file regolare. |
