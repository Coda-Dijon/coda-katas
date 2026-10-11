#include <ctype.h>

#include "warCry.h"

void to_war_cry(char *name) {
    int i = 0;
    while (name[i] != '\0') {
        name[i] = (char) toupper(name[i]);
        i++;
    }
}
