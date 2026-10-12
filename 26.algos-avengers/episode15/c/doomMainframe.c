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
    return result;
}
