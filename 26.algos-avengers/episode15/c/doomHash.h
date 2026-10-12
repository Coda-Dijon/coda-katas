#ifndef DOOM_HASH_H
#define DOOM_HASH_H

#include <stdbool.h>

// Décompilés par JARVIS depuis le firmware du terminal de Doom.
// Fournis tels quels : ce n'est pas l'objet de l'exercice.

// Le hash attendu par le terminal pour ouvrir une session.
#define DOOM_PASSWORD_HASH 1286072744u

// Hash non cryptographique (FNV-1a) utilisé par le terminal de Doom.
unsigned int doom_hash(const char *candidate);

// Règle appliquée par le terminal : au moins 8 caractères, une majuscule,
// une minuscule, un chiffre, et un caractère spécial parmi ".*#@$%&".
bool matches_doom_rules(const char *candidate);

#endif
