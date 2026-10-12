#ifndef DOOM_MAINFRAME_H
#define DOOM_MAINFRAME_H

#include "doomHash.h"

typedef struct {
    char password[32]; // "" si rien n'a été trouvé dans les bornes fixées
    int attempts; // nombre de candidats qui ont respecté la règle et dont on a calculé le hash
} CrackResult;

// Ta mission : essaie prefix + tous les suffixes possibles, de longueur 0 à
// max_suffix_length, sur l'alphabet du terminal. Ne garde que les candidats qui
// respectent matches_doom_rules, calcule leur hash avec doom_hash, et arrête-toi
// au premier qui correspond à DOOM_PASSWORD_HASH.
CrackResult crack_doom_password(const char *prefix, int max_suffix_length);

#endif
