### Episode 12 : La Séquence des Particules Pym

Quand Ant-Man active ses particules Pym, leur nombre suit une croissance bien particulière : chaque valeur est la somme des deux précédentes (comme la suite de Fibonacci), en commençant par `0` et `1`.

Ta mission : écrire dans `out` les `n` premiers termes de cette suite (`0, 1, 1, 2, 3, 5, 8, 13, ...`).

## Pièges
- `n = 0` : rien à écrire
- `n = 1` : juste `0`

```c
void pym_sequence(int n, long *out);
```
