### Episode 8 : Le Cri de Guerre

Avant d'entrer en scène, chaque Avenger veut que son nom soit affiché en lettres capitales, façon cri de guerre.

**Les chaînes en C** ne sont pas un type à part : c'est un tableau de `char` qui se termine par un caractère spécial, `'\0'` (le "caractère nul"). Une boucle sur une chaîne s'arrête donc quand elle rencontre ce caractère :

```c
while (name[i] != '\0') {
    // ...
    i++;
}
```

Ta mission : transformer un nom **en place** (directement dans le tableau reçu) pour qu'il soit tout en majuscules. La fonction `toupper` de `<ctype.h>` convertit un caractère en majuscule (et ne touche pas aux caractères qui n'ont pas d'équivalent, comme l'espace).

## Pièges
- Chaîne vide
- Nom déjà en majuscules
- Nom avec un espace (ex : "Iron Man")

```c
void to_war_cry(char *name);
```
