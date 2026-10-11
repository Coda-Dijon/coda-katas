### Episode 7 : Le Classement des Vengeurs

Pour le prochain tableau d'affichage du Q.G., l'équipe doit être triée du plus faible au plus fort.

Ta mission : trier le tableau d'Avengers par puissance croissante, **en place** (le tableau passé en paramètre doit être modifié directement).

Un tableau se trie en comparant les éléments deux à deux et en les échangeant s'ils sont dans le mauvais ordre :

```c
void swap(Avenger *a, Avenger *b) {
    Avenger tmp = *a;
    *a = *b;
    *b = tmp;
}
```

## Pièges
- Tableau déjà trié
- Un seul membre
- Deux membres avec la même puissance

```c
void sort_by_power(Avenger *team, int count);
```
