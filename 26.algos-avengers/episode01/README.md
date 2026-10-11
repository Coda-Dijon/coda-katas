### Episode 1 : L'Appel des Vengeurs

Nick Fury envoie son message à un groupe de héros, en passant leurs noms directement en ligne de commande.

En C, `main` peut recevoir ce qui a été tapé après le nom du programme :

```c
int main(int argc, char *argv[])
```

- `argc` est le nombre total d'arguments, **le nom du programme compris** (`argv[0]`).
- `argv[1]`, `argv[2]`, ... sont les arguments passés par l'utilisateur.

Ta mission : pour chaque héros passé en argument (donc à partir de `argv[1]`), afficher `<nom> a répondu à l'appel !`.

```c
#include <stdio.h>

int main(int argc, char *argv[]) {
    // TODO: pour chaque argument reçu (hors argv[0]), afficher "<nom> a répondu à l'appel !"
    return 0;
}
```

### Compiler et exécuter

```bash
cd episode01/c
cmake -B build
cmake --build build
./build/bin/avengersCall Thor Hulk "Iron Man"
```

Sortie attendue :
```
Thor a répondu à l'appel !
Hulk a répondu à l'appel !
Iron Man a répondu à l'appel !
```

Essaie aussi sans aucun argument : le programme ne doit rien afficher (ni planter).

Comme pour l'épisode 0, pas de test automatique : vérifie en lançant le programme avec différents arguments.
