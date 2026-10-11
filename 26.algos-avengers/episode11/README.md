### Episode 11 : Le Recensement des Vengeurs

Plusieurs feuilles de mission ont été compilées. Le Q.G. veut savoir combien de fois chaque héros a été appelé.

Même idiome que l'épisode précédent, mais avec **deux tableaux de sortie en parallèle** : un pour les noms distincts, un pour leurs compteurs (`out_names[i]` va avec `out_counts[i]`).

Ta mission : remplir `out_names` avec les noms distincts (dans l'ordre d'apparition) et `out_counts` avec le nombre d'apparitions de chacun, puis retourner le nombre de noms distincts.

## Pièges
- Liste vide
- Un seul nom, plusieurs fois

```c
int census(const char **names, int count, const char **out_names, int *out_counts);
```
