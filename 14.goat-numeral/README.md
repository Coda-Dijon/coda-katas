## Goat Numeral

### **Contexte**
Les chèvres ont leur propre système de numération. Pas de chiffres arabes, pas de lettres romaines : juste quelques bêlements codifiés, du `M` tout simple au `🐐` qui vaut mille. Votre mission est d'écrire le traducteur qui permet à n'importe quel humain de s'adresser à un troupeau en Goat Numeral.

![Goat Numeral](img/goat.webp)

### **Table des symboles**

| Valeur | Symbole Goat |
|--------|---------------|
| 1      | `M`           |
| 5      | `Ba`          |
| 10     | `Meh`         |
| 50     | `Baa`         |
| 100    | `Meeh`        |
| 500    | `Baaa`        |
| 1000   | `🐐`          |

### **Cas d'exemples**

| Nombre | Goat Numeral |
|--------|---------------|
| `0`    | `""`         |
| `1`    | `M`           |
| `3`    | `MMM`         |
| `4`    | `MBa`         |
| `5`    | `Ba`          |
| `9`    | `MMeh`        |
| `10`   | `Meh`         |
| `13`   | `MehMMM`      |
| `40`   | `MehBaa`      |
| `90`   | `MehMeeh`     |
| `400`  | `MeehBaaa`    |
| `900`  | `Meeh🐐`     |
| `1000` | `🐐`         |
| `2499` | `🐐🐐MeehBaaaMehMeehMMeh` |
| `2900` | `🐐🐐Meeh🐐` |
| `4000` | `""`         |

### **Objectif du kata**
Écrire une fonction `toGoatNumeral(nombre)` qui convertit un entier en Goat Numeral. 
Plage valide : `1` à `3999`.

### **Bonus**
Implémentez aussi `fromGoatNumeral(texte)`, l'opération inverse.

### Ressource
Article original [Mastering Property-Based Testing in .NET with FsCheck](https://goatreview.com/property-based-testing-fscheck/).
