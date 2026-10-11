### Episode 0 : Avengers, Assemble !

Avant de parler algorithmes, il faut un programme qui compile et qui tourne. Un programme C minimal, c'est une fonction `main`, et au moins une instruction dedans.

Ta mission : complète `main.c` pour qu'il affiche `Avengers, assemble !` suivi d'un retour à la ligne, en utilisant `printf`.

```c
#include <stdio.h>

int main(void) {
    // TODO: afficher "Avengers, assemble !"
    return 0;
}
```

### Compiler et exécuter

```bash
cd episode00/c
cmake -B build
cmake --build build
./build/bin/avengersAssemble
```

Il n'y a pas de test automatique ici : la vérification, c'est toi qui la fais, en lisant la sortie du programme.
