#include <stdio.h>
#include <string.h>

#include "doomMainframe.h"

int main(void) {
    printf("Connexion au mainframe de Doom...\n");

    const CrackResult result = crack_doom_password("Avengers", 4);

    if (strlen(result.password) > 0) {
        printf("🔓 Mot de passe trouvé : %s (en %d tentatives)\n", result.password, result.attempts);
    } else {
        printf("Mot de passe introuvable dans les limites fixées (%d tentatives)\n", result.attempts);
    }

    return 0;
}
