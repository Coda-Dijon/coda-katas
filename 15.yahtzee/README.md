## Yahtzee Kata

### **Contexte**
Le Yahtzee est un jeu de dés simple. À chaque tour, un joueur lance **5 dés à 6 faces**. Il peut relancer tout ou partie des dés jusqu'à 3 fois (lancer initial compris), puis doit placer son résultat dans une catégorie de score.

Ce kata s'intéresse uniquement à cette dernière étape : étant donné un lancer (5 dés) et une catégorie, calculer le score obtenu.

Kata basé sur [Ruby Quiz #19](http://rubyquiz.com/quiz19.html).

### **Catégories de score**

| Catégorie                               | Règle                                                                     | Exemple                                                      |
|-----------------------------------------|---------------------------------------------------------------------------|--------------------------------------------------------------|
| Ones, Twos, Threes, Fours, Fives, Sixes | Somme des dés affichant la valeur de la catégorie                         | `1,1,2,4,4` sur "fours" → `8`                                |
| Pair                                    | Somme des deux dés les plus élevés formant une paire                      | `3,3,3,4,4` sur "pair" → `8`                                 |
| Two pairs                               | Somme des dés si deux paires distinctes, sinon `0`                        | `1,1,2,3,3` → `8`                                            |
| Three of a kind                         | Somme des dés si un brelan, sinon `0`                                     | `3,3,3,4,5` → `9`                                            |
| Four of a kind                          | Somme des dés si un carré, sinon `0`                                      | `2,2,2,2,5` → `8`                                            |
| Small straight                          | `15` si les dés sont `1,2,3,4,5`, sinon `0`                               |                                                              |
| Large straight                          | `20` si les dés sont `2,3,4,5,6`, sinon `0`                               |                                                              |
| Full house                              | Somme de tous les dés si deux d'une valeur + trois d'une autre, sinon `0` | `1,1,2,2,2` → `8` (mais `4,4,4,4,4` n'est pas un full house) |
| Yahtzee                                 | `50` si les 5 dés sont identiques, sinon `0`                              |                                                              |
| Chance                                  | Somme de tous les dés, sans condition                                     |                                                              |

Plus d'infos sur les règles du jeu [ici](https://www.ultraboardgames.com/yahtzee/game-rules.php).

### **Partie 2 : sans exceptions**
Reprenez votre implémentation, mais **interdiction d'utiliser des exceptions** (`throw`, `try`/`catch` et équivalents), y compris pour signaler un lancer ou une catégorie invalide.

À vous de trouver comment représenter ces cas autrement dans votre design.
