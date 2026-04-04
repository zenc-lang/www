+++
title = "std/string"
+++

# std/string

`String` é um tipo de string expansível, alocado no heap. Envolve um `Vec<char>` e garante a terminação nula para compatibilidade com C.

## Uso

```zc
import "std/string.zc"

fn main() {
    let s = String::from("Hello");

    // O append requer um ponteiro para outra String
    let part = String::from(" World");
    s.append(&part);
    
    // Iteração (compatível com UTF-8)
    for c in s {
        println "{c}";
    }

    // Usar c_str() para imprimir
    println "{s.c_str()}"; // Imprime "Hello World"
    
    if (s.starts_with("Hello")) {
        // ...
    }
} // s é libertado automaticamente aqui
```

## Definição da Estrutura

```zc
struct String {
    vec: Vec<char>;
}
```

## Métodos

### Construção

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **new** | `String::new(s: char*) -> String` | Cria uma nova String a partir de uma primitiva de string C. |
| **from** | `String::from(s: char*) -> String` | Alias para `new`. |
| **from_rune** | `String::from_rune(r: rune) -> String` | Cria uma nova String a partir de um único `rune`. |
| **from_runes** | `String::from_runes(runes: rune*, count: usize) -> String` | Cria uma nova String a partir de um array de `runes`. |
| **from_runes_vec**| `String::from_runes_vec(runes: Vec<rune>) -> String` | Cria uma nova String a partir de um vetor de objetos `rune`. |

### Modificação

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **append** | `append(self, other: String*)` | Anexa outra string a esta. |
| **append_c** | `append_c(self, s: char*)` | Anexa um literal de string C. |
| **push_rune** | `push_rune(self, r: rune)` | Anexa um único ponto de código Unicode (`rune`) à string. |
| **insert_rune** | `insert_rune(self, idx: usize, r: rune)` | Insere um `rune` no *índice de caracteres* especificado. |
| **remove_rune_at**| `remove_rune_at(self, idx: usize) -> rune`| Remove e retorna o `rune` no *índice de caracteres* especificado. |
| **reserve** | `reserve(self, cap: usize)` | Garante que a string tenha pelo menos `cap` caracteres de capacidade. |
| **clear** | `clear(self)` | Limpa a string. |

### Acesso e Consulta

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **c_str** | `c_str(self) -> char*` | Retorna o ponteiro da string C subjacente. |
| **length** | `length(self) -> usize` | Retorna o comprimento da string (excluindo o terminador nulo). |
| **is_empty** | `is_empty(self) -> bool` | Retorna verdadeiro se o comprimento for 0. |
| **to_string** | `to_string(self) -> char*` | Mapeia para `c_str()`. Usado para interpolação `{var}`. |
| **starts_with** | `starts_with(self, prefix: char*) -> bool` | Verifica se a string começa com o prefixo dado. |
| **ends_with** | `ends_with(self, suffix: char*) -> bool` | Verifica se a string termina com o sufixo dado. |
| **contains** | `contains(self, target: char) -> bool` | Verifica se a string contém o caractere dado. |
| **contains_str** | `contains_str(self, target: char*) -> bool` | Verifica se a string contém a substring dada. |
| **find** | `find(self, target: char) -> Option<usize>` | Retorna o índice da primeira ocorrência do byte `target`. |
| **find_str** | `find_str(self, target: char*) -> Option<usize>` | Retorna o índice da primeira ocorrência da substring `target`. |
| **find_all_str** | `find_all_str(self, target: char*) -> Vec<usize>` | Retorna um vetor contendo todos os índices onde `target` ocorre. |
| **substring** | `substring(self, start: usize, len: usize) -> String` | Retorna uma nova String contendo a substring especificada. |

### Suporte UTF-8

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **utf8_len** | `utf8_len(self) -> usize` | Retorna o número de pontos de código Unicode (caracteres). |
| **utf8_at** | `utf8_at(self, idx: usize) -> String` | Retorna o caractere no índice especificado como uma nova String. |
| **utf8_get** | `utf8_get(self, idx: usize) -> rune` | Retorna o caractere no índice especificado como um `rune`. |
| **utf8_substr** | `utf8_substr(self, start_idx: usize, num_chars: usize) -> String` | Retorna uma substring baseada em índices de caracteres. |
| **runes** | `runes(self) -> Vec<rune>` | Retorna um vetor contendo todos os pontos de código Unicode. |
| **chars** | `chars(self) -> StringCharsIter` | Retorna um iterador manual que produz `Option<rune>`. |

### Transformações

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **to_lowercase** | `to_lowercase(self) -> String` | Retorna uma nova string convertida para minúsculas. |
| **to_uppercase** | `to_uppercase(self) -> String` | Retorna uma nova string convertida para maiúsculas. |
| **split** | `split(self, delim: char) -> Vec<String>` | Divide a string num vetor de substrings. |
| **trim** | `trim(self) -> String` | Retorna uma nova string com os espaços em branco iniciais/finais removidos. |
| **replace** | `replace(self, target: char*, replacement: char*) -> String` | Retorna uma nova string com as substituições feitas. |
| **pad_left** | `pad_left(self, target_len: usize, pad_char: char) -> String` | Retorna uma nova string preenchida à esquerda. |
| **pad_right** | `pad_right(self, target_len: usize, pad_char: char) -> String` | Retorna uma nova string preenchida à direita. |

### Comparação

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **eq** | `eq(self, other: String*) -> bool` | Verificação de igualdade estrutural. |
| **neq** | `neq(self, other: String*) -> bool` | Verificação de desigualdade estrutural. |
| **compare** | `compare(self, other: String*) -> int` | Comparação lexical. |
| **compare_ignore_case**| `compare_ignore_case(self, other: String*) -> int` | Comparação lexical sem distinção entre maiúsculas e minúsculas. |
| **eq_ignore_case** | `eq_ignore_case(self, other: String*) -> bool` | Verificação de igualdade sem distinção entre maiúsculas e minúsculas. |

## Operadores

| Operador | Método | Descrição |
| :--- | :--- | :--- |
| `+` | **add** | `s1 + &s2`. Concatena strings numa nova `String`. |
| `+=` | **add_assign** | `s1 += &s2`. Anexa `s2` a `s1` in-place. |
| `==` | **eq** | `s1 == &s2`. Verificação de igualdade estrutural. |
| `!=` | **neq** | `s1 != &s2`. Verificação de desigualdade estrutural. |
| `<` | **lt** | `s1 < &s2`. Comparação lexical. |
| `>` | **gt** | `s1 > &s2`. Comparação lexical. |
| `<=` | **le** | `s1 <= &s2`. Comparação lexical. |
| `>=` | **ge** | `s1 >= &s2`. Comparação lexical. |
| `{}` | **to_string** | Usado para interpolação de strings em `printf`/`println`. |

## Iteração

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **iterator** | `iterator(self) -> StringCharsIter` | Retorna um iterador que produz `rune`. Usado por `for c in s`. |

## Gestão de Memória

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **free** | `free(self)` | Liberta manualmente a memória da string. |
| **destroy** | `destroy(self)` | Alias para `free`. |
| **forget** | `forget(self)` | Impede a libertação automática (transfere titularidade). |
| **Trait** | `impl Drop for String` | Chama automaticamente `free()` quando sai do escopo. |
