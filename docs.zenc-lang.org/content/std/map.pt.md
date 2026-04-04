+++
title = "std/map"
+++

# std/map

`Map<V>` é uma implementação de tabela de hash genérica que mapeia chaves de string para valores do tipo `V`.

## Uso

```zc
import "std/map.zc"

fn main() {
    let m = Map<int>::new();
    
    m.put("um", 1);
    m.put("dois", 2);
    
    if (m.contains("um")) {
        let val = m.get("um");
        println "{val.unwrap()}";
    }
    
    m.remove("dois");
} // m é libertado automaticamente aqui
```

## Definição da Estrutura

```zc
struct Map<V> {
    keys: char**;
    vals: V*;
    // ... campos internos
}
```

## Métodos

### Construção

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **new** | `Map<V>::new() -> Map<V>` | Cria um novo mapa vazio. |

### Iteração

Pode iterar sobre os pares chave-valor do mapa usando um loop `for`.

```zc
let m = Map<int>::new();
m.put("a", 1);

for entry in m {
    println "Chave: {entry.key}, Val: {entry.val}";
}
```

O iterador produz uma estrutura `MapEntry<V>`:
```zc
struct MapEntry<V> {
    key: char*;
    val: V;
}
```

### Modificação

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **put** | `put(self, key: char*, val: V)` | Insere ou atualiza um par chave-valor. |
| **remove** | `remove(self, key: char*)` | Remove uma chave e o seu valor do mapa. |

### Acesso e Consulta

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **get** | `get(self, key: char*) -> Option<V>` | Recupera o valor associado à chave. |
| **contains** | `contains(self, key: char*) -> bool` | Retorna verdadeiro se a chave existir. |
| **length** | `length(self) -> usize` | Retorna o número de itens no mapa. |
| **is_empty** | `is_empty(self) -> bool` | Retorna verdadeiro se o mapa estiver vazio. |
| **capacity** | `capacity(self) -> usize` | Retorna a capacidade atual do mapa. |

### Auxiliares de Iteração

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **is_slot_occupied** | `is_slot_occupied(self, idx: usize) -> bool` | Verifica se um índice de slot bruto está ocupado. |
| **key_at** | `key_at(self, idx: usize) -> char*` | Obtém a chave num índice de slot bruto. |
| **val_at** | `val_at(self, idx: usize) -> V` | Obtém o valor num índice de slot bruto. |

## Gestão de Memória

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| **free** | `free(self)` | Liberta o armazenamento interno do mapa. **Nota**: Isto não liberta os valores se forem ponteiros/objetos. |
| **Trait** | `impl Drop for Map` | Chama automaticamente `free()` quando sai do escopo. |
