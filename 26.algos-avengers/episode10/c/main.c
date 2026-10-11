#include <stdio.h>

#include "avengersUniqueness.h"

int main(void) {
    const char *names[] = {"Thor", "Hulk", "Thor", "Iron Man", "Hulk"};
    const char *out[5];

    const int uniqueCount = unique_avenger_names(names, 5, out);

    for (int i = 0; i < uniqueCount; i++) {
        printf("%s\n", out[i]);
    }
    return 0;
}
