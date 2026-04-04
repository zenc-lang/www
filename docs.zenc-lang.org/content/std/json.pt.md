+++
title = "std/json"
+++

# std/json

O módulo `std/json` fornece uma implementação de parser e construtor JSON estilo DOM para Zen-C. Apresenta uma API simples para criar, manipular e serializar dados JSON com gestão automática de memória.

## Visão Geral

- **Estilo DOM**: Estrutura de árvore hierárquica de nós `JsonValue`.
- **Acessores Tipados**: Verifica tipos (`is_string`, `is_number`) e desembrulha valores com segurança.
- **Limpeza Automática**: Implementa o trait `Drop` para gestão de memória automática e recursiva.
- **Conformidade com Padrões**: Suporta tipos JSON padrão, incluindo objetos, arrays, strings, números, booleanos e nulo.

## Uso

```zc
import "std/json.zc"

fn main() {
    // Construir JSON
    let obj = JsonValue::object();
    obj.set("name", JsonValue::string("Alice"));
    obj.set("age", JsonValue::number(30.0));
    obj.set("active", JsonValue::bool(true));
    
    // Serialização
    let json_str = obj.to_string();
    println "Serializado: {json_str}";
    
    // Parsing
    let input = "{\"score\": 100}";
    match JsonValue::parse(input) {
        Ok(parsed) => {
            println "Pontuação: {parsed.get(\"score\").unwrap().as_int().unwrap()}";
            // parsed é libertado automaticamente quando este bloco termina
        }
        Err(e) => println "Erro: {e}"
    }
} // obj é libertado automaticamente aqui
```

## Definição da Estrutura

```zc
struct JsonValue {
    kind: JsonType;
    // ... campos internos
}
```

## Métodos

### Construção

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **null** | `JsonValue::null() -> JsonValue` | Cria um valor nulo. |
| **bool** | `JsonValue::bool(b: bool) -> JsonValue` | Cria um valor booleano. |
| **number** | `JsonValue::number(n: double) -> JsonValue` | Cria um valor numérico. |
| **string** | `JsonValue::string(s: char*) -> JsonValue` | Cria um valor de string. |
| **array** | `JsonValue::array() -> JsonValue` | Cria um array JSON vazio. |
| **object** | `JsonValue::object() -> JsonValue` | Cria um objeto JSON vazio. |

### Parsing

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **parse** | `JsonValue::parse(json: char*) -> Result<JsonValue*>` | Faz o parse de uma string JSON para uma árvore alocada no heap. |

### Acessores

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **is_null** | `is_null(self) -> bool` | Retorna verdadeiro se o tipo for nulo. |
| **is_bool** | `is_bool(self) -> bool` | Retorna verdadeiro se o tipo for booleano. |
| **is_number** | `is_number(self) -> bool` | Retorna verdadeiro se o tipo for um número. |
| **is_string** | `is_string(self) -> bool` | Retorna verdadeiro se o tipo for uma string. |
| **is_array** | `is_array(self) -> bool` | Retorna verdadeiro se o tipo for um array. |
| **is_object** | `is_object(self) -> bool` | Retorna verdadeiro se o tipo for um objeto. |
| **as_string** | `as_string(self) -> Option<char*>` | Retorna o ponteiro da string se aplicável. |
| **as_int** | `as_int(self) -> Option<int>` | Retorna o valor inteiro se aplicável. |
| **as_float** | `as_float(self) -> Option<double>` | Retorna o valor numérico se aplicável. |
| **as_bool** | `as_bool(self) -> Option<bool>` | Retorna o valor booleano se aplicável. |

### Modificação

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **push** | `push(self, val: JsonValue)` | Adiciona um valor filho a um array JSON. |
| **set** | `set(self, key: char*, val: JsonValue)` | Insere ou atualiza um par chave-valor num objeto JSON. |
| **get** | `get(self, key: char*) -> Option<JsonValue*>` | Recupera um valor filho de um objeto pela chave. |
| **at** | `at(self, index: usize) -> Option<JsonValue*>` | Recupera um valor filho de um array pelo índice. |

### Serialização

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **to_string** | `to_string(self) -> String` | Retorna uma string JSON serializada. |

## Gestão de Memória

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **free** | `free(self)` | Liberta recursivamente o valor e todos os nós descendentes. |
| **Trait** | `impl Drop for JsonValue` | Aciona automaticamente o `free()` recursivo quando sai do escopo. |
