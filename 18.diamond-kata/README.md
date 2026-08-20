## Diamond Kata

### **Contexte**
Ce kata classique de TDD consiste à écrire une fonction qui, à partir d'une lettre donnée, génère un diamant commençant et se terminant par la lettre `A`, s'élargissant jusqu'à la lettre passée en paramètre puis se resserrant symétriquement.

**Exemple pour l'entrée `C` :**
```
  A
 B B
C   C
 B B
  A
```

Kata proposé à l'origine par Seb Rose, popularisé notamment par la réponse d'Alistair Cockburn.

### **Règles**
- Entrée : une lettre majuscule, de `A` à `Z`.
- Sortie : le diamant correspondant, centré, avec les espaces nécessaires pour que chaque ligne ait la même longueur.
- Le diamant est symétrique horizontalement (chaque ligne) et verticalement (haut/bas).

### **Votre mission**
Implémentez `diamond(letter)` en **TDD**, par petits pas. Plusieurs stratégies sont possibles pour construire votre liste de cas de test, par exemple :
- **Test Recycling** : partir de cas très simples ("A" → "AB" → "ABB" → ...) et complexifier progressivement, en réutilisant chaque test pour construire le suivant.
- **TDDist Way** : progresser lettre par lettre (diamant pour `A`, puis `B`, puis `C`...).
- **Approche fonctionnelle / Property-Based Testing** : se concentrer sur les propriétés du résultat (symétrie, longueur des lignes, caractères présents...) plutôt que sur des exemples figés.

### **Objectifs pédagogiques**
- Pratiquer le TDD par petits pas sur un problème qui combine plusieurs dimensions de complexité (construction de chaîne, alignement, symétrie).
- Expérimenter différentes stratégies pour construire une liste de cas de test et comparer leur efficacité.
- Découvrir le **Property-Based Testing** comme alternative à l'example-based testing sur un cas concret.

### **Ressources**
[Une implémentation possible](https://github.com/ythirion/crappy-driven-development/tree/main/src/scala/diamond) (en scala)