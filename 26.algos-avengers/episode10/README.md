### Episode 10 : L'Unicité des Vengeurs

Le planning de la prochaine mission contient des doublons : certains héros ont été appelés deux fois par erreur. Il faut nettoyer la liste.

**Le problème : comment retourner une liste en C ?** En C, une fonction ne peut retourner qu'**une seule valeur**. Pour "retourner" une liste de taille variable, l'astuce est de demander à l'appelant de fournir un tableau déjà alloué (`out`), que la fonction va **remplir**, et de retourner le **nombre d'éléments écrits** :

```c
int unique_avenger_names(const char **names, int count, const char **out);
```

Ta mission : écrire dans `out` les noms de `names` sans doublon, **en conservant l'ordre d'apparition**, et retourner le nombre de noms écrits. Le tableau `out` est déjà assez grand pour contenir tous les éléments de `names` — tu n'as pas besoin d'allouer de mémoire.

## Pièges
- Liste vide
- Aucun doublon
- Que des doublons (le même nom répété)

```c
int unique_avenger_names(const char **names, int count, const char **out);
```
