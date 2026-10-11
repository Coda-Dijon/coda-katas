### Episode 9 : Le Message Inversé

Loki a intercepté un message et l'a inversé pour brouiller les pistes. Il faut le remettre à l'endroit.

Ta mission : inverser une chaîne **en place**, en échangeant les caractères depuis les deux extrémités vers le centre (le même principe d'échange que pour le tri de l'épisode 7, mais sur des `char` plutôt que des `Avenger`).

Il te faut d'abord connaître la longueur de la chaîne — `strlen` (de `<string.h>`) te la donne sans compter le `'\0'` final.

## Pièges
- Chaîne vide
- Un seul caractère
- Longueur paire et longueur impaire

```c
void reverse_message(char *message);
```
