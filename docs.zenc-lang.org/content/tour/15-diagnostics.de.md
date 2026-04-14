+++
title = "15. Diagnosesystem"
weight = 15
+++

# 15. Diagnosesystem


Zen C bietet ein kategorisiertes Diagnosesystem, das eine granulare Kontrolle über Compiler-Warnungen ermöglicht. Dies hilft dabei, hohe Standards für die Codequalität einzuhalten und gleichzeitig die Reibung bei der Interaktion mit externem C-Code zu verringern.

#### Diagnose-Kategorien

Warnungen sind in logische Kategorien gruppiert. Jede Kategorie kann global über Compiler-Flags aktiviert oder deaktiviert werden.

| Kategorie | Beschreibung | Standard |
| :--- | :--- | :--- |
| **`INTEROP`** | Warnungen im Zusammenhang mit C-Header-Imports und undefinierten externen Funktionen. | **OFF** |
| **`PEDANTIC`** | Besonders strenge Prüfungen auf potenzielle Probleme oder Codequalität. | **OFF** |
| **`UNUSED`** | Warnungen für definierte, aber ungenutzte Variablen, Parameter oder Funktionen. | **ON** |
| **`SAFETY`** | Kritische Sicherheitswarnungen wie Nullpointer-Zugriff oder Division durch Null. | **ON** |
| **`LOGIC`** | Logikbezogene Warnungen wie nicht erreichbarer Code oder konstante Vergleiche. | **ON** |
| **`CONVERSION`** | Warnungen bei impliziten oder einschränkenden Typumwandlungen. | **ON** |
| **`STYLE`** | Warnungen zum Codierstil wie beispeilsweise Variable Shadowing. | **ON** |

#### Compiler-Flags

Du kannst die Diagnosen mit den Flags `-W` (aktivieren) und `-Wno-` (deaktivieren) steuern, gefolgt vom Kategorienamen oder einer spezifischen Diagnose-ID.

##### Kategorie-Flags

- `-Winterop`: Aktiviert alle interoperabilitätsbezogenen Warnungen.
- `-Wno-unused`: Schaltet Warnungen bei ungenutzten Variablen/Parametern gezielt stumm.
- `-Wsafety`: Stellt sicher, dass alle Sicherheitsprüfungen aktiv sind.
- `-Wall`: Aktiviert alle wichtigen Diagnosekategorien.
- `-Wextra`: Aktiviert noch strengere Diagnosen (entspricht `-Wpedantic`).

##### Anwendungsbeispiel

```bash
# Mit aktivierten C-Interop-Warnungen kompilieren
zc app.zc -Winterop

# Mit allen Warnungen außer für ungenutzten Code kompilieren
zc app.zc -Wall -Wno-unused
```

#### C-Interop Friction

Standardmäßig unterdrückt Zen C "Undefined function"-Warnungen für Funktionen, die wahrscheinlich zu C-Standardbibliotheken gehören (`INTEROP`-Kategorie ist **OFF**).

Wenn du möchtest, dass der Compiler jede undefinierte Funktion streng markiert (z. B. um Tippfehler abzufangen), aktiviere die Interop-Kategorie:

```bash
zc main.zc -Winterop
```

Wenn aktiviert, liefert der Compiler hilfreiche Vorschläge für gängige C-Funktionen:
```text
warning: Undefined function 'abs'
  --> main.zc:5:13
   |
5  |     let x = abs(-5);
   |             ^ here
   |
   = note: If this is a C function, it might need to be whitelisted in 'zenc.json'
```

#### Whitelisting

Wenn du häufig eine bestimmte C-Bibliothek verwendest und `-Winterop` aktiviert lassen möchtest, ohne von bestimmten Funktionen genervt zu werden, kannst du diese zur `c_function_whitelist` in der Konfigurationsdatei `zenc.json` hinzufügen.

## Tooling

Zen C bietet einen eingebauten **Language Server** und eine REPL, um die Entwicklungsarbeit zu erleichtern. Außerdem kann Zen C mit LLDB oder GDB debuggt werden.

### Language Server (LSP)

Der Zen C Language Server unterstützt das Language Server Protocol (LSP) und bietet die typischen Editor-Funktionen:

* **Gehe zu Definition** (`Go to Definition`)
* **Finde Referenzen** (`Find References`)
* **Hover-Informationen**
* **Autovervollständigung** (Funktions-/Struct-Namen, Methoden/Felder via Punkt)
* **Dokumentstruktur** (`Document Symbols` / Outline)
* **Signatur-Hilfe**
* **Diagnosen** (Syntax- und Semantikfehler)

Starten des Sprachserver (normalerweise in den LSP-Einstellungen deinem Editors konfiguriert):

```bash
zc lsp
```

Es kommuniziert über Standard I/O (JSON-RPC 2.0).

### REPL

Die Read-Eval-Print-Schleife ermöglicht es, interaktiv mit Zen C-Code zu experimentieren.

```bash
zc repl
```

#### Features

*   **Interaktives Coden**: Ausdrücke oder Statements sofort auswerten.
*   **Persistente Historie**: Befehle werden in `~/.zprep_history` gespeichert.
*   **Startup-Skript**: Lädt automatisch `~/.zprep_init.zc`.

#### Befehle

| Befehl | Beschreibung |
|:---|:---|
| `:help` | Zeigt alle verfügbaren Kommandos an |
| `:reset` | Löscht aktuelle Session-Historie (Variablen/Funktionen) |
| `:vars` | Zeigt aktive Variablen |
| `:funcs` | Zeigt benutzerdefinierte Funktionen |
| `:structs` | Zeigt benutzerdefinierte Structs |
| `:imports` | Zeigt aktive Importe |
| `:history` | Zeigt Session-Eingabeverlauf |
| `:type <expr>` | Zeigt den Typ eines Ausdrucks |
| `:c <stmt>` | Zeigt den generierten C-Code für ein Statement |
| `:time <expr>` | Benchmark eines Ausdrucks (1000 Iterationen) |
| `:edit [n]` | Bearbeite Befehl `n` im `$EDITOR` (Standard: letzter) |
| `:save <file>` | Speichert die aktuelle Session in einer `.zc` Datei |
| `:load <file>` | Lädt und führt eine `.zc` Datei in die Session aus |
| `:watch <expr>` | Beobachtet einen Ausdruck (automatisch nach jeder Eingabe aktualisiert) |
| `:unwatch <n>` | Entfernt einen Watch |
| `:undo` | Entfernt den letzten Befehl aus der Session |
| `:delete <n>` | Löscht Befehl an Index `n` |
| `:clear` | Bildschirm leeren |
| `:quit` | REPL beenden |
| `! <cmd>` | Führe Shell-Befehl aus (z.B. `!ls`) |

---

### Language Server Protocol (LSP)

Zen C enthält einen integrierten Sprachserver zur Editorintegration.

- **[Installations- und Einrichtungsanleitung](../docs/LSP.md)**
- **Unterstützte Editoren**: VS Code, Neovim, Vim ([zenc.vim](https://github.com/zenc-lang/zenc.vim)), Zed und alle LSP-fähigen Editoren.

Verwende `zc lsp`, um den Server zu starten.

### Debugging Zen C

Zen C Programme können mit Standard-C-Debuggern wie **LLDB** oder **GDB** debuggt werden.

#### Visual Studio Code

Für eine optimale Benutzererfahrung in VS Code installiere die offizielle [Zen C-Erweiterung](https://marketplace.visualstudio.com/items?itemName=Z-libs.zenc). Verwende zum Debuggen die **C/C++**-Erweiterung (von Microsoft) oder die **CodeLLDB**-Erweiterung.

Füge diese Konfigurationen in den `.vscode`-Verzeichnis hinzu, um das Debuggen mit einem Klick zu aktivieren:

**`tasks.json`** (Build Task):
```json
{
    "label": "Zen C: Build Debug",
    "type": "shell",
    "command": "zc",
    "args": [ "${file}", "-g", "-o", "${fileDirname}/app", "-O0" ],
    "group": { "kind": "build", "isDefault": true }
}
```

**`launch.json`** (Debugger):
```json
{
    "name": "Zen C: Debug (LLDB)",
    "type": "lldb",
    "request": "launch",
    "program": "${fileDirname}/app",
    "preLaunchTask": "Zen C: Build Debug"
}
```

## Compilerunterstützung & Kompatibilität

Zen C ist so konzipiert, dass es mit den meisten **C11-Compilern** funktioniert. Einige Features basieren auf **GNU-C-Erweiterungen**, funktionieren aber oft auch in anderen Compilern. Mit dem `--cc`-Flag kannst du das Backend wechseln.

```bash
zc run app.zc --cc clang
zc run app.zc --cc zig
```

### Status der Test-Suite

<details>
<summary>Klicke, um Compiler-Support-Details anzuzeigen</summary>

| Compiler | Erfolgsrate | Unterstützte Features | Bekannte Einschränkungen |
|:---|:---:|:---|:---|
| **GCC** | **100 % (Vollständig)** | Alle Features | Keine |
| **Clang** | **100 % (Vollständig)** | Alle Features | Keine |
| **Zig** | **100 % (Vollständig)** | Alle Features | Keine. Nutzt `zig cc` als Drop-in-C-Compiler |
| **TCC** | **98 % (Hoch)** | Structs, Generics, Traits, Pattern Matching | Kein Intel-ASM, kein `__attribute__((constructor))` |

</details>

{% alert(type="warning") %}
**COMPILER BUILD WARNING:** Obwohl **Zig CC** hervorragend als Backend für Zen C Programme funktioniert, kann das **Bauen des Zen C Compilers selbst** damit zwar erfolgreich verifizieren, aber instabile Binaries erzeugen, die Tests nicht bestehen. Empfehlung: Den Compiler selbst mit **GCC** oder **Clang** bauen und Zig nur als Backend für Produktionscode verwenden.
{% end %}

### Build mit Zig

Zigs `zig cc` dient als Drop-in-Ersatz für GCC/Clang mit exzellenter Cross-Compilation-Unterstützung. Um Zig zu verwenden:

```bash
# Zen C Programm mit Zig kompilieren und ausführen
zc run app.zc --cc zig

# Den Zen C Compiler selbst mit Zig bauen
make zig
```

### C++-Interoperabilität

Zen C kann mit dem `--cpp`-Flag C++-kompatiblen Code generieren und dadurch nahtlos mit C++-Bibliotheken interagieren.

```bash
# Direkte Kompilierung mit g++
zc app.zc --cpp

# Oder transpilen und manuell bauen
zc transpile app.zc --cpp
g++ out.c my_cpp_lib.o -o app
```

#### Verwendung von C++ in Zen C

C++-Header einbinden und raw-Blöcke für nativen C++-Code verwenden:

```zc
include <vector>
include <iostream>

raw {
    std::vector<int> make_vec(int a, int b) {
        return {a, b};
    }
}

fn main() {
    let v = make_vec(1, 2);
    raw { std::cout << "Size: " << v.size() << std::endl; }
}
```

{% alert(type="note") %}
Das `--cpp`-Flag wechselt auf `g++` als Backend und erzeugt C++-kompatiblen Code (`auto` statt `__auto_type`, Overloads statt `_Generic`, explizite `void*`-Casts).
{% end %}

### CUDA-Interoperabilität

Zen C unterstützt GPU-Programmierung durch Transpilierung nach **CUDA C++**. Dadurch lassen sich moderne C++-Features (Templates, constexpr) in CUDA-Kernels nutzen, während die ergonomische Zen C Syntax erhalten bleibt.

```bash
# Direkt mit nvcc kompilieren
zc run app.zc --cuda

# Oder transpilen und manuell bauen
zc transpile app.zc --cuda -o app.cu
nvcc app.cu -o app
```

#### CUDA-spezifische Attribute

| Attribut | CUDA-Äquivalent | Beschreibung |
|:---|:---|:---|
| `@global` | `__global__` | Kernel-Funktion (läuft auf GPU, wird vom Host aufgerufen) |
| `@device` | `__device__` | Device-Funktion (läuft auf GPU, wird von GPU aufgerufen) |
| `@host` | `__host__` | Host-Funktion (explizit CPU-only) |

#### Kernel-Launch-Syntax

Zen C bietet ein sauberes `launch`-Statement zum Aufruf von CUDA-Kernels:

```zc
launch kernel_name(args) with {
    grid: num_blocks,
    block: threads_per_block,
    shared_mem: 1024,  // Optional
    stream: my_stream   // Optional
};
```

This transpiles to: `kernel_name<<<grid, block, shared, stream>>>(args);`

#### Schreiben von CUDA-Kernels

Verwende normale Zen C Funktionen mit `@global` und `launch`:

```zc
import "std/cuda.zc"

@global
fn add_kernel(a: float*, b: float*, c: float*, n: int) {
    let i = thread_id();
    if i < n {
        c[i] = a[i] + b[i];
    }
}

fn main() {
    def N = 1024;
    let d_a = cuda_alloc<float>(N);
    let d_b = cuda_alloc<float>(N); 
    let d_c = cuda_alloc<float>(N);
    defer cuda_free(d_a);
    defer cuda_free(d_b);
    defer cuda_free(d_c);

    // ... Daten initialisieren ...
    
    launch add_kernel(d_a, d_b, d_c, N) with {
        grid: (N + 255) / 256,
        block: 256
    };
    
    cuda_sync();
}
```

#### Standardbibliothek (`std/cuda.zc`)
Zen C stellt eine Standardbibliothek für gängige CUDA-Operationen zur Verfügung, um `raw`-Blöcke zu reduzieren:

```zc
import "std/cuda.zc"

// Speicherverwaltung
let d_ptr = cuda_alloc<float>(1024);
cuda_copy_to_device(d_ptr, h_ptr, 1024 * sizeof(float));
defer cuda_free(d_ptr);

// Synchronisation
cuda_sync();

// Thread-Indizes (innerhalb von Kernels)
let i = thread_id(); // Globaler Index
let bid = block_id();
let tid = local_id();
```

{% alert(type="note") %}
**Hinweis:** Das `--cuda`-Flag setzt automatisch `nvcc` als Compiler und aktiviert implizit `--cpp`. Setzt NVIDIA CUDA Toolkit voraus.
{% end %}

### C23-Unterstützung

Zen C unterstützt moderne **C23-Features**, wenn ein kompatibler Backend-Compiler verwendet wird  
(GCC 14+, Clang 14+, TCC (teilweise)).

- **`auto`**: Zen C bildet Typinferenz automatisch auf das standardisierte C23-`auto` ab, wenn `__STDC_VERSION__ >= 202300L`.
- **`_BitInt(N)`**: Verwende `iN`- und `uN`-Typen (z. B. `i256`, `u12`, `i24`), um auf Ganzzahlen mit beliebiger Bitbreite aus C23 zuzugreifen.

### Objective-C-Interoperabilität

Zen C kann mit dem `--objc`-Flag nach **Objective-C (`.m`)** kompilieren, sodass Objective-C-Frameworks (wie Cocoa/Foundation) und deren Syntax direkt genutzt werden können.

```bash
# Mit clang kompilieren (oder gcc/gnustep)
zc app.zc --objc --cc clang
```

#### Verwendung von Objective-C in Zen C

Verwende `include` für Header und `raw`-Blöcke für Objective-C-Syntax (`@interface`, `[...]`, `@""`).

```zc
//> macos: framework: Foundation
//> linux: cflags: -fconstant-string-class=NSConstantString -D_NATIVE_OBJC_EXCEPTIONS
//> linux: link: -lgnustep-base -lobjc

include <Foundation/Foundation.h>

fn main() {
    raw {
        NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];
        NSLog(@"Hello from Objective-C!");
        [pool drain];
    }
    println "Zen C funktioniert ebenfalls!";
}
```

{% alert(type="note") %}
**Hinweis:** Zen C String-Interpolation funktioniert auch mit Objective-C-Objekten (`id`), indem automatisch `debugDescription` oder `description` aufgerufen wird.
{% end %}

---

## Mitwirken

Wir freuen uns über Beiträge!  
Egal ob Bugfixes, Dokumentation oder neue Sprachfeatures.

Siehe [CONTRIBUTING.md](4%20CONTRIBUTING_EN.md) für detaillierte Richtlinien zum Mitwirken, Testen und Einreichen von Pull Requests.

---

## Sicherheit

Hinweise zum Melden von Sicherheitslücken findest du in [SECURITY.md](5%20SECURITY_EN.md).

---

## Quellenangaben

Dieses Projekt verwendet Bibliotheken von Drittanbietern. Die vollständigen Lizenztexte befinden sich im Verzeichnis `LICENSES/`.

*   **[cJSON](https://github.com/DaveGamble/cJSON)** (MIT-Lizenz): Wird für JSON-Parsing und -Generierung im Language Server verwendet.
*   **[zc-ape](https://github.com/OEvgeny/zc-ape)** (MIT-Lizenz): Der ursprüngliche Actually Portable Executable Port von Zen C von **[Eugene Olonov](https://github.com/OEvgeny)**.
*   **[Cosmopolitan Libc](https://github.com/jart/cosmopolitan)** (ISC-Lizenz): Die zugrunde liegende Bibliothek, die APE ermöglicht.
*   **[TRE](https://github.com/laurikari/tre)** (BSD-Lizenz): Wird für die Regex-Engine der Standardbibliothek verwendet.
*   **[zenc.vim](https://github.com/zenc-lang/zenc.vim)** (MIT-Lizenz): Das offizielle Vim/Neovim-Plugin, hauptsächlich entwickelt von **[davidscholberg](https://github.com/davidscholberg)**.

---

<div align="center">
  <p>
    Copyright © 2026 Zen C Programmiersprache.<br>
    Starte deine Reise noch heute.
  </p>
  <p>
    <a href="https://discord.com/invite/q6wEsCmkJP">Discord</a> •
    <a href="https://github.com/zenc-lang/zenc">GitHub</a> •
    <a href="https://github.com/zenc-lang/docs">Dokumentation</a> •
    <a href="https://github.com/zenc-lang/awesome-zenc">Beispiele</a> •
    <a href="https://github.com/zenc-lang/rfcs">RFCs</a> •
    <a href="CONTRIBUTING_DE.md">Mitwirken</a>
  </p>
</div>