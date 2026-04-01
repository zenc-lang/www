+++
title = "17. Interoperabilidad C"
weight = 13
+++

# 17. Interoperabilidad C

Zen C ofrece dos formas de interactuar con código C: **Importaciones de Confianza** (Conveniente) y **FFI Explícita** (Seguro/Preciso).

#### Método 1: Importaciones de Confianza (Conveniente)

Puedes importar una cabecera C directamente usando la palabra clave `import` con la extensión `.h`. Esto trata la cabecera como un módulo y asume que todos los símbolos accedidos existen.

```zc
//> link: -lm
import "math.h" as c_math;

fn main() {
    // El compilador confía en la corrección; emite 'cos(...)' directamente
    let x = c_math::cos(3.14159);
}
```

> **Pros**: Cero código repetitivo. Acceso a todo el contenido de la cabecera inmediato.
> **Cons**: Sin seguridad de tipos desde Zen C (errores capturados por el compilador C después).

#### Método 2: FFI Explícita (Seguro)

Para una comprobación estricta de tipos o cuando no quieres incluir el texto de una cabecera, usa `extern fn`.

```zc
include <stdio.h> // Emite #include <stdio.h> en el C generado

// Define firma estricta
extern fn printf(fmt: char*, ...) -> c_int;

fn main() {
    printf("Hola FFI: %d\n", 42); // Comprobado por tipos por Zen C
}
```

> **Pros**: Zen C asegura que los tipos coincidan.
> **Cons**: Requiere declaración manual de funciones.

#### `import` vs `include`

- **`import "file.h"`**: Registra la cabecera como un módulo con nombre. Habilita el acceso implícito a símbolos (ej. `file::function()`).
- **`include <file.h>`**: Puramente emite `#include <file.h>` en el código C generado. No introduce ningún símbolo al compilador de Zen C; debes usar `extern fn` para acceder a ellos.


---

## Biblioteca Estándar

Zen C incluye una biblioteca estándar (`std`) que cubre las funcionalidades esenciales.

[Explorar la Documentación de la Biblioteca Estándar](../docs/std/README.md)

### Módulos Clave

<details>
<summary>Click para ver todos los módulos de la Biblioteca Estándar</summary>

| Módulo | Descripción | Docs |
| :--- | :--- | :--- |
| **`std/bigfloat.zc`** | Aritmética de punto flotante de precisión arbitraria. | [Docs](../docs/std/bigfloat.md) |
| **`std/bigint.zc`** | Entero de precisión arbitraria `BigInt`. | [Docs](../docs/std/bigint.md) |
| **`std/bits.zc`** | Operaciones bit a bit de bajo nivel (`rotl`, `rotr`, etc). | [Docs](../docs/std/bits.md) |
| **`std/complex.zc`** | Aritmética de números complejos `Complex`. | [Docs](../docs/std/complex.md) |
| **`std/vec.zc`** | Array dinámico creíble `Vec<T>`. | [Docs](../docs/std/vec.md) |
| **`std/string.zc`** | Tipo `String` asignado en el heap con soporte UTF-8. | [Docs](../docs/std/string.md) |
| **`std/queue.zc`** | Cola FIFO (Ring Buffer). | [Docs](../docs/std/queue.md) |
| **`std/map.zc`** | Mapa Hash Genérico `Map<V>`. | [Docs](../docs/std/map.md) |
| **`std/fs.zc`** | Operaciones del sistema de archivos. | [Docs](../docs/std/fs.md) |
| **`std/io.zc`** | Entrada/Salida estándar (`print`/`println`). | [Docs](../docs/std/io.md) |
| **`std/option.zc`** | Valores opcionales (`Some`/`None`). | [Docs](../docs/std/option.md) |
| **`std/result.zc`** | Gestión de errores (`Ok`/`Err`). | [Docs](../docs/std/result.md) |
| **`std/path.zc`** | Manipulación de rutas multiplataforma. | [Docs](../docs/std/path.md) |
| **`std/env.zc`** | Variables de entorno del proceso. | [Docs](../docs/std/env.md) |
| **`std/net/`** | TCP, UDP, HTTP, DNS, URL. | [Docs](../docs/std/net.md) |
| **`std/thread.zc`** | Hilos y Sincronización. | [Docs](../docs/std/thread.md) |
| **`std/time.zc`** | Medición de tiempo y espera (sleep). | [Docs](../docs/std/time.md) |
| **`std/json.zc`** | Parseo y serialización de JSON. | [Docs](../docs/std/json.md) |
| **`std/stack.zc`** | Pila LIFO `Stack<T>`. | [Docs](../docs/std/stack.md) |
| **`std/set.zc`** | Conjunto Hash Genérico `Set<T>`. | [Docs](../docs/std/set.md) |
| **`std/process.zc`** | Ejecución y gestión de procesos. | [Docs](../docs/std/process.md) |
| **`std/regex.zc`** | Expresiones Regulares (basado en TRE). | [Docs](../docs/std/regex.md) |
| **`std/simd.zc`** | Tipos de vectores SIMD nativos. | [Docs](../docs/std/simd.md) |

</details>

---

## Herramientas

Zen C proporciona un Servidor de Lenguaje y un REPL integrados para mejorar la experiencia de desarrollo.

### Servidor de Lenguaje (LSP)

El Servidor de Lenguaje de Zen C (LSP) soporta las características estándar de LSP para integración con editores, proporcionando:

*   **Ir a la Definición**
*   **Encontrar Referencias**
*   **Información al pasar el ratón (Hover)**
*   **Autocompletado** (Nombres de funciones/structs, autocompletado tras punto para métodos/campos)
*   **Símbolos del Documento** (Esquema)
*   **Ayuda de Firma**
*   **Diagnósticos** (Errores sintácticos/semánticos)

Para iniciar el servidor de lenguaje (normalmente configurado en los ajustes de LSP de tu editor):

```bash
zc lsp
```

Se comunica mediante I/O estándar (JSON-RPC 2.0).

### REPL

El bucle Read-Eval-Print te permite experimentar con el código de Zen C de forma interactiva.

```bash
zc repl
```

#### Características

*   **Codificación Interactiva**: Escribe expresiones o sentencias para su evaluación inmediata.
*   **Historial Persistente**: Los comandos se guardan en `~/.zprep_history`.
*   **Script de Inicio**: Carga automáticamente comandos desde `~/.zprep_init.zc`.

#### Comandos

| Comando | Descripción |
|:---|:---|
| `:help` | Muestra los comandos disponibles. |
| `:reset` | Limpia el historial de la sesión actual (variables/funciones). |
| `:vars` | Muestra las variables activas. |
| `:funcs` | Muestra las funciones definidas por el usuario. |
| `:structs` | Muestra los structs definidos por el usuario. |
| `:imports` | Muestra las importaciones activas. |
| `:history` | Muestra el historial de entrada de la sesión. |
| `:type <expr>` | Muestra el tipo de una expresión. |
| `:c <stmt>` | Muestra el código C generado para una sentencia. |
| `:time <expr>` | Benchmark de una expresión (ejecuta 1000 iteraciones). |
| `:edit [n]` | Edita el comando `n` (por defecto: el último) en `$EDITOR`. |
| `:save <file>` | Guarda la sesión actual en un archivo `.zc`. |
| `:load <file>` | Carga y ejecuta un archivo `.zc` en la sesión. |
| `:watch <expr>` | Observa una expresión (se revalúa tras cada entrada). |
| `:unwatch <n>` | Elimina una observación. |
| `:undo` | Elimina el último comando de la sesión. |
| `:delete <n>` | Elimina el comando en el índice `n`. |
| `:clear` | Limpia la pantalla. |
| `:quit` | Sale del REPL. |
| `! <cmd>` | Ejecuta un comando de shell (ej. `!ls`). |

---


### Protocolo de Servidor de Lenguaje (LSP)

Zen C incluye un Servidor de Lenguaje integrado para la integración con editores.

- **[Guía de Instalación y Configuración](translations/LSP_ES.md)**
- **Editores Soportados**: VS Code, Neovim, Vim, Zed, y cualquier editor capaz de LSP.

Usa `zc lsp` para iniciar el servidor.

### Depuración de Zen C

Los programas de Zen C se pueden depurar utilizando depuradores de C estándar como **LLDB** o **GDB**.

#### Visual Studio Code

Para obtener la mejor experiencia en VS Code, instale la [extensión oficial de Zen C](https://marketplace.visualstudio.com/items?itemName=Z-libs.zenc). Para la depuración, puede utilizar la extensión **C/C++** (de Microsoft) o **CodeLLDB**.

Agregue estas configuraciones a su directorio `.vscode` para habilitar la depuración con un solo clic:

**`tasks.json`** (Tarea de compilación):
```json
{
    "label": "Zen C: Build Debug",
    "type": "shell",
    "command": "zc",
    "args": [ "${file}", "-g", "-o", "${fileDirname}/app", "-O0" ],
    "group": { "kind": "build", "isDefault": true }
}
```

**`launch.json`** (Depurador):
```json
{
    "name": "Zen C: Debug (LLDB)",
    "type": "lldb",
    "request": "launch",
    "program": "${fileDirname}/app",
    "preLaunchTask": "Zen C: Build Debug"
}
```

## Soporte del Compilador y Compatibilidad

Zen C está diseñado para funcionar con la mayoría de los compiladores C11. Algunas características dependen de extensiones de GNU C, pero estas suelen funcionar en otros compiladores. Usa la flag `--cc` para cambiar de backend.

```bash
zc run app.zc --cc clang
zc run app.zc --cc zig
```

### Estado de la Suite de Pruebas

<details>
<summary>Click para ver detalles de Soporte del Compilador</summary>

| Compilador | Tasa de Acierto | Características Soportadas | Limitaciones Conocidas |
|:---|:---:|:---|:---|
| **GCC** | **100% (Completo)** | Todas las características | Ninguna. |
| **Clang** | **100% (Completo)** | Todas las características | Ninguna. |
| **Zig** | **100% (Completo)** | Todas las características | Ninguna. Usa `zig cc` como compilador C. |
| **TCC** | **98% (Alto)** | Estructuras, Genéricos, Traits, Coincidencia de Patrones | Sin ASM Intel, Sin `__attribute__((constructor))`. |

</details>

{% alert(type="warning") %}
**ADVERTENCIA DE COMPILACIÓN:** Aunque **Zig CC** funciona excelentemente como backend para tus programas Zen C, compilar el *propio compilador Zen C* con el puede verificar pero producir un binario inestable que falla en las pruebas. Recomendamos compilar el compilador con **GCC** o **Clang** y usar Zig solo como backend para tu código operativo.
{% end %}

### Construyendo con Zig

El comando `zig cc` de Zig proporciona un reemplazo directo para GCC/Clang con un excelente soporte de compilación cruzada (cross-compilation). Para usar Zig:

```bash
# Compilar y ejecutar un programa Zen C con Zig
zc run app.zc --cc zig

# Construir el propio compilador Zen C con Zig
make zig
```

### Interop con C++

Zen C puede generar código compatible con C++ con la flag `--cpp`, permitiendo una integración perfecta con bibliotecas de C++.

```bash
# Compilación directa con g++
zc app.zc --cpp

# O transpilar para construcción manual
zc transpile app.zc --cpp
g++ out.c mi_lib_cpp.o -o app
```

#### Usando C++ en Zen C

Incluye cabeceras de C++ y usa bloques `raw` para el código C++:

```zc
include <vector>
include <iostream>

raw {
    std::vector<int> hacer_vec(int a, int b) {
        return {a, b};
    }
}

fn main() {
    let v = hacer_vec(1, 2);
    raw { std::cout << "Tamaño: " << v.size() << std::endl; }
}
```

{% alert(type="note") %}
La flag `--cpp` cambia el backend a `g++` y emite código compatible con C++ (usa `auto` en lugar de `__auto_type`, sobrecarga de funciones en lugar de `_Generic`, y casts explícitos para `void*`).
{% end %}

#### Interop con CUDA

Zen C soporta la programación de GPU transpilando a **CUDA C++**. Esto te permite aprovechar las potentes características de C++ (plantillas, constexpr) dentro de tus kernels mientras mantienes la sintaxis ergonómica de Zen C.

```bash
# Compilación directa con nvcc
zc run app.zc --cuda

# O transpilar para construcción manual
zc transpile app.zc --cuda -o app.cu
nvcc app.cu -o app
```

#### Atributos Específicos de CUDA

| Atributo | Equivalente CUDA | Descripción |
|:---|:---|:---|
| `@global` | `__global__` | Función de kernel (se ejecuta en GPU, se llama desde el host) |
| `@device` | `__device__` | Función de dispositivo (se ejecuta en GPU, se llama desde GPU) |
| `@host` | `__host__` | Función de host (explícitamente solo CPU) |

#### Sintaxis de Lanzamiento de Kernel

Zen C proporciona una sentencia `launch` limpia para invocar kernels de CUDA:

```zc
launch nombre_del_kernel(args) with {
    grid: num_bloques,
    block: hilos_por_bloque,
    shared_mem: 1024,  // Opcional
    stream: mi_stream   // Opcional
};
```

Esto se transpila a: `nombre_del_kernel<<<grid, bloque, compartido, stream>>>(args);`

#### Escribiendo Kernels de CUDA

Usa la sintaxis de funciones de Zen C con `@global` y la sentencia `launch`:

```zc
import "std/cuda.zc"

@global
fn kernel_suma(a: float*, b: float*, c: float*, n: int) {
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

    // ... inicialización de datos ...
    
    launch kernel_suma(d_a, d_b, d_c, N) with {
        grid: (N + 255) / 256,
        block: 256
    };
    
    cuda_sync();
}
```

#### Biblioteca Estándar (`std/cuda.zc`)
Zen C proporciona una biblioteca estándar para operaciones comunes de CUDA para reducir los bloques `raw`:

```zc
import "std/cuda.zc"

// Gestión de memoria
let d_ptr = cuda_alloc<float>(1024);
cuda_copy_to_device(d_ptr, h_ptr, 1024 * sizeof(float));
defer cuda_free(d_ptr);

// Sincronización
cuda_sync();

// Indexación de hilos (usar dentro de kernels)
let i = thread_id(); // Índice global
let bid = block_id();
let tid = local_id();
```


{% alert(type="note") %}
**Nota:** La flag `--cuda` establece `nvcc` como el compilador e implica el modo `--cpp`. Requiere el NVIDIA CUDA Toolkit.
{% end %}

### Soporte C23

Zen C soporta características modernas de C23 cuando se utiliza un compilador backend compatible (GCC 14+, Clang 14+).

- **`auto`**: Zen C mapea automáticamente la inferencia de tipos a `auto` estándar de C23 si `__STDC_VERSION__ >= 202300L`.
- **`_BitInt(N)`**: Use tipos `iN` y `uN` (ej. `i256`, `u12`, `i24`) para acceder a enteros de ancho arbitrario de C23.

### Interop con Objective-C

Zen C puede compilarse a Objective-C (`.m`) usando la flag `--objc`, permitiéndote usar frameworks de Objective-C (como Cocoa/Foundation) y su sintaxis.

```bash
# Compilar con clang (o gcc/gnustep)
zc app.zc --objc --cc clang
```

#### Usando Objective-C en Zen C

Usa `include` para las cabeceras y bloques `raw` para la sintaxis de Objective-C (`@interface`, `[...]`, `@""`).

```zc
//> macos: framework: Foundation
//> linux: cflags: -fconstant-string-class=NSConstantString -D_NATIVE_OBJC_EXCEPTIONS
//> linux: link: -lgnustep-base -lobjc

include <Foundation/Foundation.h>

fn main() {
    raw {
        NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];
        NSLog(@"¡Hola desde Objective-C!");
        [pool drain];
    }
    println "¡Zen C también funciona!";
}
```

{% alert(type="note") %}
**Nota:** La interpolación de cadenas de Zen C funciona con objetos de Objective-C (`id`) llamando a `debugDescription` o `description`.
{% end %}
