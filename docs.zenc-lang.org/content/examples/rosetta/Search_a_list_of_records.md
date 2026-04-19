+++
title = "Search a list of records"
+++

# Search a list of records

```zc
struct City {
    name: string;
    population: f32;
}

alias Pred = fn(City) -> bool;

fn find_first(data: City*, len: usize, pred: Pred*) -> int {
    for i in 0..len {
        if (*pred)(data[i]) { return i; }
    }
    return -1;
}

fn main() {
    let cities: City[10] = [
        City{ name: "Lagos",                population: 21.0  },
        City{ name: "Cairo",                population: 15.2  },
        City{ name: "Kinshasa-Brazzaville", population: 11.3  },
        City{ name: "Greater Johannesburg", population:  7.55 },
        City{ name: "Mogadishu",            population:  5.85 },
        City{ name: "Khartoum-Omdurman",    population:  4.98 },
        City{ name: "Dar Es Salaam",        population:  4.7  },
        City{ name: "Alexandria",           population:  4.58 },
        City{ name: "Abidjan",              population:  4.4  },
        City{ name: "Casablanca",           population:  3.98 }
    ];
    let pred = fn(c: City) -> bool { return c.name == "Dar Es Salaam"; }
    let index = find_first(cities, 10, &pred);
    println "Index of the first city whose name is 'Dar Es Salaam' is {index}.";

    pred = fn(c: City) -> bool { return c.population < 5.0; }
    index = find_first(cities, 10, &pred);
    let name = cities[index].name;
    println "First city whose population is less than 5 million is {name}.";

    pred = fn(c: City) -> bool { return c.name[0] == 'A'; }
    index = find_first(cities, 10, &pred);
    let pop = cities[index].population;
    println "The population of the first city whose name begins with 'A' is {pop:g} million.";
}
```

**Output:**

```
Index of the first city whose name is 'Dar Es Salaam' is 6.
First city whose population is less than 5 million is Khartoum-Omdurman.
The population of the first city whose name begins with 'A' is 4.58 million.
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Search a list of records**](https://rosettacode.org/wiki/Search_a_list_of_records) in Zen C.

*This article uses material from the Rosetta Code article **Search a list of records**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Search_a_list_of_records?action=history).*
