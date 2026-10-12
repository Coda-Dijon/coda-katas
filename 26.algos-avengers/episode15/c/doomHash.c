#include <ctype.h>
#include <string.h>

#include "doomHash.h"

unsigned int doom_hash(const char *candidate) {
    unsigned int hash = 2166136261u;
    for (const char *p = candidate; *p != '\0'; p++) {
        hash ^= (unsigned char) *p;
        hash *= 16777619u;
    }
    return hash;
}

bool matches_doom_rules(const char *candidate) {
    if (strlen(candidate) < 8) {
        return false;
    }

    bool has_upper = false;
    bool has_lower = false;
    bool has_digit = false;
    bool has_special = false;

    for (const char *p = candidate; *p != '\0'; p++) {
        if (isupper((unsigned char) *p)) has_upper = true;
        else if (islower((unsigned char) *p)) has_lower = true;
        else if (isdigit((unsigned char) *p)) has_digit = true;
        else if (strchr(".*#@$%&", *p) != NULL) has_special = true;
    }

    return has_upper && has_lower && has_digit && has_special;
}
