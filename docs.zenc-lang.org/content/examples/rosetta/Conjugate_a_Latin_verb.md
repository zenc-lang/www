+++
title = "Conjugate a Latin verb"
+++

# Conjugate a Latin verb

```zc
fn conjugate(inf: string, eng: string, stem: string, 
             e1: string, e2: string, e3: string, e4: string, e5: string, e6: string) {
             
    println "Present indicative tense, active voice, of '{inf}' to '{eng}':";
    
    let endings: string[6] = [e1, e2, e3, e4, e5, e6];
    let pronouns: string[6] = ["I", "you (singular)", "he, she or it", "we", "you (plural)", "they"];
    
    for let i = 0; i < 6; i += 1 {
        print "    {stem}{endings[i]}";
        
        // Calculate padding for alignment.
        let word_len = strlen(stem) + strlen(endings[i]);
        for let p = word_len; p < 12; p += 1 {
            print " ";
        }
        
        if i == 2 {
            println "{pronouns[i]} {eng}s";
        } else {
            println "{pronouns[i]} {eng}";
        }
    }
    println "";
}

fn main() {
    // 1st Conjugation
    conjugate("amare", "love", "am", 
              "o", "as", "at", "amus", "atis", "ant");

    // 2nd Conjugation
    conjugate("videre", "see", "vid", 
              "eo", "es", "et", "emus", "etis", "ent");

    // 3rd Conjugation
    conjugate("ducere", "lead", "duc", 
              "o", "is", "it", "imus", "itis", "unt");

    // 4th Conjugation
    conjugate("audire", "hear", "aud", 
              "io", "is", "it", "imus", "itis", "iunt");
}
```

---
**Attribution:** This is a community solution for the Rosetta Code task [**Conjugate a Latin verb**](https://rosettacode.org/wiki/Conjugate_a_Latin_verb) in Zen C.

*This article uses material from the Rosetta Code article **Conjugate a Latin verb**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Conjugate_a_Latin_verb?action=history).*
