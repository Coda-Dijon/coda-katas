### Episode 4 : Le Détecteur du Plus Fort

Avant une mission, le Q.G. veut savoir qui envoyer en premier : le héros le plus puissant de l'équipe.

Ta mission : trouver l'Avenger ayant le plus haut niveau de puissance, et retourner un pointeur vers lui.

## Pièges
- Équipe vide : retourne `NULL`
- Un seul membre
- Deux membres avec la même puissance : retourne le premier trouvé

```c
const Avenger *strongest_avenger(const Avenger *team, int count);
```
