#include <stdio.h>

#include "avengersCensus.h"

int main(void) {
    const char *names[] = {"Thor", "Hulk", "Thor", "Iron Man", "Hulk", "Thor"};
    const char *outNames[6];
    int outCounts[6];

    const int distinctCount = census(names, 6, outNames, outCounts);

    for (int i = 0; i < distinctCount; i++) {
        printf("%s: %d\n", outNames[i], outCounts[i]);
    }
    return 0;
}
