#include <string.h>

#include "doomMainframe.h"

// Tous les caractères que le terminal de Doom accepte (~69 caractères).
static const char ALPHABET[] =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    "abcdefghijklmnopqrstuvwxyz"
    "0123456789"
    ".*#@$%&";
#define ALPHABET_SIZE ((int) (sizeof(ALPHABET) - 1))

CrackResult crack_doom_password(const char *prefix, int max_suffix_length) {
    CrackResult result = {"", 0};
    const int prefix_len = (int) strlen(prefix);

    for (int suffix_len = 0; suffix_len <= max_suffix_length; suffix_len++) {
        long total = 1;
        for (int i = 0; i < suffix_len; i++) {
            total *= ALPHABET_SIZE;
        }

        for (long combo = 0; combo < total; combo++) {
            char candidate[64];
            strcpy(candidate, prefix);

            long remaining = combo;
            for (int i = suffix_len - 1; i >= 0; i--) {
                candidate[prefix_len + i] = ALPHABET[remaining % ALPHABET_SIZE];
                remaining /= ALPHABET_SIZE;
            }
            candidate[prefix_len + suffix_len] = '\0';

            if (!matches_doom_rules(candidate)) {
                continue;
            }
            result.attempts++;
            if (doom_hash(candidate) == DOOM_PASSWORD_HASH) {
                strcpy(result.password, candidate);
                return result;
            }
        }
    }
    return result;
}
