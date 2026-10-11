### Episode 5 : La Moyenne de Puissance du Groupe

Le S.H.I.E.L.D. veut évaluer le niveau moyen de puissance d'une équipe avant de l'envoyer en mission.

Ta mission : calculer la puissance moyenne de l'équipe.

## Pièges
- Équipe vide : retourne `0.0` (pas de division par zéro)
- Un seul membre

```c
double average_power(const Avenger *team, int count);
```
