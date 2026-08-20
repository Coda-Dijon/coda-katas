#include <stdio.h>

#include "planets.h"

int main(void) {
    const char *planets[] = {"Tatooine", "Hoth", "Tatooine", "Naboo", "Hoth", "Tatooine"};
    PlanetCount out[6];

    const int distinctCount = count_planets(planets, 6, out);

    for (int i = 0; i < distinctCount; i++) {
        printf("%s: %d\n", out[i].name, out[i].count);
    }
    return 0;
}
