### Episode 13 : Le Code Secret de Loki

Loki communique avec ses alliés via des codes qui se lisent de la même manière dans les deux sens : des palindromes (ex : "kayak", "radar").

**La récursivité**, c'est une fonction qui s'appelle elle-même, avec un **cas de base** qui arrête les appels (sinon elle ne s'arrête jamais). Pour vérifier un palindrome :
- Si la chaîne a 0 ou 1 caractère restant à comparer → c'est un palindrome (cas de base).
- Sinon, si le premier et le dernier caractère restants sont différents → ce n'est pas un palindrome.
- Sinon → la réponse est la même que pour la chaîne **sans son premier et son dernier caractère** (appel récursif).

Ta mission : écrire `is_palindrome` en utilisant la récursivité, en ignorant la casse (majuscules/minuscules). `tolower` (de `<ctype.h>`) convertit un caractère en minuscule.

## Pièges
- Chaîne vide : palindrome par convention
- Un seul caractère : toujours un palindrome
- Casse mélangée (ex : "Kayak")

```c
bool is_palindrome(const char *text);
```
