## Gilded Rose

### **Contexte**
Vous reprenez la maintenance d'un vieux système d'inventaire pour une taverne, la "Gilded Rose". Le code fonctionne en production depuis des années, mais plus personne n'ose y toucher : une seule méthode `updateQuality`, des conditions imbriquées sur plusieurs niveaux, aucun test. C'est un kata de **refactoring**, pas un kata où l'on part d'une page blanche.

C'est un kata classique du Software Craft, créé par Terry Hughes et popularisé/maintenu en plusieurs langages par Emily Bache ([GildedRose-Refactoring-Kata sur GitHub](https://github.com/emilybache/GildedRose-Refactoring-Kata)). Le code de départ fourni ici en est une adaptation.

### **Les règles métier existantes (ne changent pas)**
- Chaque article (`Item`) a un nom (`name`), un nombre de jours restants avant péremption (`sellIn`) et une qualité (`quality`).
- À chaque appel de `updateQuality`, `sellIn` diminue de 1 pour tous les articles, **sauf** `"Sulfuras, Hand of Ragnaros"` (légendaire, ne s'use jamais et ne se vend jamais).
- La `quality` d'un article n'est jamais négative, et ne dépasse jamais `50` — sauf `"Sulfuras"`, dont la qualité est fixe à `80`.
- Une fois la date dépassée (`sellIn < 0`), la qualité des articles normaux se dégrade **deux fois plus vite**.
- `"Aged Brie"` **augmente** de qualité en vieillissant (plus il est vieux, meilleur il est).
- `"Backstage passes to a TAFKAL80ETC concert"` (billets de concert) augmentent de qualité à l'approche de la date, puis tombent à `0` une fois le concert passé :
  - `+1` normalement,
  - `+2` quand `sellIn < 11`,
  - `+3` quand `sellIn < 6`,
  - `quality = 0` une fois le concert passé (`sellIn < 0`).

### **Votre mission**
1. **Ne modifiez pas encore `updateQuality`.** Commencez par écrire des **tests de caractérisation** : des tests qui capturent le comportement actuel du code tel qu'il est (même si certaines règles vous paraissent étranges). Le but est d'obtenir un filet de sécurité avant de toucher à quoi que ce soit.
2. Une fois la couverture suffisante (tous les types d'articles, cas limites `quality = 0`, `quality = 50`, `sellIn` négatif...), **refactorez** le code pour le rendre lisible et facile à faire évoluer, sans changer son comportement. Les tests doivent rester verts à chaque étape.
3. Ajoutez enfin une **nouvelle fonctionnalité** : les articles `"Conjured"` (ex. `"Conjured Mana Cake"`) se dégradent en qualité **deux fois plus vite** qu'un article normal, avant comme après la date de péremption. Si le refactoring est réussi, ce dernier point doit être rapide à écrire et facile à tester.

### **Règles du jeu**
- **Interdiction de changer la signature publique** de `updateQuality` et des champs de `Item` : c'est le contrat existant, comme dans un vrai projet legacy.
- Le refactoring se fait par **petits pas**, tests au vert en continu (aucun commit avec des tests rouges).
- N'essayez pas de "tout comprendre" avant de commencer : laissez les tests de caractérisation vous révéler le comportement, comme vous le feriez face à du vrai code legacy.

### **Cas d'exemples (pour vos tests de caractérisation)**

| Article de départ (`name`, `sellIn`, `quality`)                     | Après 1 `updateQuality()`      | Explication |
|-----------------------------------------------------------------------|----------------------------------|--------------|
| `"foo", 10, 20`                                                       | `sellIn=9, quality=19`           | Article normal, qualité -1. |
| `"foo", 0, 5`                                                         | `sellIn=-1, quality=3`           | Date dépassée : qualité se dégrade 2x plus vite. |
| `"foo", 5, 0`                                                         | `sellIn=4, quality=0`            | La qualité ne descend jamais sous 0. |
| `"Aged Brie", 10, 40`                                                 | `sellIn=9, quality=41`           | S'améliore en vieillissant. |
| `"Aged Brie", 5, 50`                                                  | `sellIn=4, quality=50`           | La qualité ne dépasse jamais 50. |
| `"Sulfuras, Hand of Ragnaros", 5, 80`                                 | `sellIn=5, quality=80`           | Légendaire : ni `sellIn` ni `quality` ne bougent. |
| `"Backstage passes to a TAFKAL80ETC concert", 15, 20`                 | `sellIn=14, quality=21`          | `+1` tant que `sellIn >= 11`. |
| `"Backstage passes to a TAFKAL80ETC concert", 10, 20`                 | `sellIn=9, quality=22`           | `+2` quand `sellIn < 11`. |
| `"Backstage passes to a TAFKAL80ETC concert", 5, 20`                  | `sellIn=4, quality=23`           | `+3` quand `sellIn < 6`. |
| `"Backstage passes to a TAFKAL80ETC concert", 0, 20`                  | `sellIn=-1, quality=0`           | Chute à 0 une fois le concert passé. |
| `"Conjured Mana Cake", 3, 6` *(bonus, à implémenter)*                 | `sellIn=2, quality=4`            | Se dégrade 2x plus vite qu'un article normal. |

### **Code de départ**
Le code de départ (volontairement dense et peu lisible — **c'est le point de départ du kata, pas un exemple à imiter**) est fourni dans `src/`, prêt à compiler/tester, avec un premier test de caractérisation déjà en place :
- **Java** — `src/java` (Maven + JUnit 5)
- **TypeScript** — `src/typescript` (Vitest)
- **C** — `src/c` (CMake)
- **PHP** — `src/php` (Composer + Pest)
- **C#** — `src/c#` (.NET + xUnit)

À vous d'écrire tous les autres tests de caractérisation avant de commencer à refactorer.

### **Objectifs pédagogiques**
- Pratiquer les **tests de caractérisation** pour sécuriser du code existant avant de le modifier.
- S'entraîner au **refactoring par petits pas**, tests au vert en continu.
- Découper une grosse fonction conditionnelle en **règles métier isolées et testables**, une par type d'article.
- Vivre concrètement pourquoi du code non testé est un **risque** et un frein au changement, même pour une fonctionnalité en apparence simple (`"Conjured"`).
- Manipuler du **code legacy multi-langage** avec les mêmes contraintes dans plusieurs écosystèmes.

### Ressources
- [Guide étape par étape](https://github.com/ythirion/scala-kata-logs/blob/main/GildedRoseKata/README.md)