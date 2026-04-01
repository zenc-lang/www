+++
title = "18. Marco de Pruebas Unitarias"
weight = 14
+++

# 18. Marco de Pruebas Unitarias


Zen C incluye un marco de pruebas integrado que permite escribir pruebas unitarias directamente en los archivos fuente utilizando la palabra clave `test`.

#### Sintaxis
Un bloque `test` contiene un nombre descriptivo y un cuerpo de código para ejecutar. Las pruebas no requieren una función `main` para ejecutarse.

```zc
test "unittest1" {
    "Esta es una prueba unitaria";

    let a = 3;
    assert(a > 0, "a debería ser un entero positivo");

    "unittest1 pasado.";
}
```

#### Ejecución de Pruebas
Para ejecutar todas las pruebas en un archivo, usa el comando `run`. El compilador detectará y ejecutará automáticamente todos los bloques `test` de nivel superior.

```bash
zc run mi_archivo.zc
```

#### Aserciones
Usa la función integrada `assert(condición, mensaje)` para verificar las expectativas. Si la condición es falsa, la prueba fallará y se imprimirá el mensaje proporcionado.

---

## Contribuyendo

¡Damos la bienvenida a las contribuciones! Ya sea corrigiendo errores, añadiendo documentación o proponiendo nuevas características.

Por favor, consulta [CONTRIBUTING_ES.md](CONTRIBUTING_ES.md) para ver las guías detalladas sobre cómo contribuir, ejecutar pruebas y enviar pull requests.

---

## Seguridad

Para instrucciones sobre reportes de seguridad, por favor vea [SECURITY_ES.md](SECURITY_ES.md).

---

## Atribuciones

Este proyecto utiliza bibliotecas de terceros. Los textos completos de las licencias pueden encontrarse en el directorio `LICENSES/`.

*   **[cJSON](https://github.com/DaveGamble/cJSON)** (Licencia MIT): Usado para el parseo y generación de JSON en el Servidor de Lenguaje.
*   **[zc-ape](https://github.com/OEvgeny/zc-ape)** (Licencia MIT): El port original de Ejecutable Realmente Portable de Zen-C por [Eugene Olonov](https://github.com/OEvgeny).
*   **[Cosmopolitan Libc](https://github.com/jart/cosmopolitan)** (Licencia ISC): La biblioteca fundamental que hace posible APE.
*   **[TRE](https://github.com/laurikari/tre)** (Licencia BSD): Usado para el motor de expresiones regulares en la biblioteca estándar.
*   **[zenc.vim](https://github.com/zenc-lang/zenc.vim)** (Licencia MIT): El plugin oficial para Vim/Neovim, escrito principalmente por **[davidscholberg](https://github.com/davidscholberg)**.

---

<div align="center">
  <p>
    Copyright © 2026 Lenguaje de Programación Zen C.<br>
    Comienza tu viaje hoy.
  </p>
  <p>
    <a href="https://discord.com/invite/q6wEsCmkJP">Discord</a> •
    <a href="https://github.com/zenc-lang/zenc">GitHub</a> •
    <a href="https://github.com/zenc-lang/docs">Documentación</a> •
    <a href="https://github.com/zenc-lang/awesome-zenc">Ejemplos</a> •
    <a href="https://github.com/zenc-lang/rfcs">RFCs</a> •
    <a href="CONTRIBUTING_ES.md">Contribuir</a>
  </p>
</div>
