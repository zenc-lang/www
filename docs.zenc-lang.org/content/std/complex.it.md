+++
title = "std/complex"
+++

# std/complex

La libreria `std/complex` fornisce la struct `Complex` e le operazioni matematiche essenziali per lavorare con i numeri complessi in Zen-C.

## Panoramica

- **Tipo di Valore**: Semplice struct con componenti `real` (reale) e `imag` (immaginaria).
- **Supporto Operatori**: Supporta `+`, `-`, `*`, `/`, `==` e `!=` tramite l'overloading degli operatori.
- **Proprietà**: Fornisce metodi per calcolare modulo e fase.
- **Interpolazione**: Può essere utilizzato direttamente nelle f-string e nelle istruzioni print.

## Utilizzo

```zc
import "std/complex.zc"

fn main() {
    let c1 = Complex::new(3.0, 4.0);
    let c2 = Complex::new(1.0, 2.0);
    
    let sum = c1 + c2;
    let prod = c1 * c2;
    
    println "Somma: {sum}";       // Somma: 4.000000 + 6.000000i
    println "Modulo: {c1.magnitude()}";
}
```

## Definizione Struct

```zc
struct Complex {
    real: double;
    imag: double;
}
```

## Metodi

### Costruzione

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **new** | `Complex::new(r: double, i: double) -> Complex` | Crea un nuovo numero complesso con componente reale `r` e componente immaginaria `i`. |

### Accesso e Query

| Metodo | Firma | Descrizione |
| :--- | :--- | :--- |
| **magnitude** | `magnitude(self) -> double` | Restituisce il modulo (valore assoluto) del numero complesso. |
| **phase** | `phase(self) -> double` | Restituisce la fase (angolo) in radianti. |

## Operatori

| Operatore | Metodo | Descrizione |
| :--- | :--- | :--- |
| `+` | **add** | Somma due numeri complessi. |
| `-` | **sub** | Sottrae un numero complesso da un altro. |
| `*` | **mul** | Moltiplica due numeri complessi. |
| `/` | **div** | Divide un numero complesso per un altro. |
| `==` | **eq** | Controlla se due numeri complessi sono strettamente uguali. |
| `!=` | **neq** | Controlla se due numeri complessi non sono uguali. |
| `{}` | **to_string** | Abilita l'interpolazione diretta delle stringhe. |
