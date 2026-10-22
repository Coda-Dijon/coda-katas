### Episode 2 bis : Le Protocole de Vision

Vision protège l'accès aux salles sensibles du QG avec des codes numériques. D'après lui, un code n'est vraiment difficile à deviner par force brute que s'il s'agit d'un **nombre premier** : un entier supérieur à 1, divisible uniquement par 1 et par lui-même.

Ta mission : implémenter `is_prime`, qui dit si un code est premier ou non.

## Pièges
- `0`, `1` et les nombres négatifs ne sont jamais premiers
- `2` est premier — c'est le seul nombre premier pair
- Inutile de tester tous les diviseurs jusqu'à `n` : s'arrêter dès que le diviseur testé dépasse la racine carrée de `n` suffit (si `n` a un diviseur plus grand que sa racine carrée, il en a forcément un plus petit aussi)

```c
bool is_prime(int n);
```

### Compiler et exécuter

```bash
cd episode02bis/c
cmake -B build
cmake --build build
./build/bin/visionProtocol
./build/bin/visionProtocol_tests
```
