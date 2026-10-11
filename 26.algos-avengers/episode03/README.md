### Episode 3 : Le Scanner des Vengeurs

Le Q.G. veut savoir si un héros donné fait partie de l'équipe présente.

Ta mission : vérifier si un nom donné figure dans l'équipe.

## Pièges
- Équipe vide
- Le héros recherché n'existe pas
- Le héros recherché est le dernier de la liste

```c
bool is_avenger_present(const Avenger *team, int count, const char *name);
```
