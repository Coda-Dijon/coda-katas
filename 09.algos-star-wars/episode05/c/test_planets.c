#include <assert.h>
#include <stdio.h>
#include <string.h>
#include "planets.h"

int count_of(const PlanetCount *out, const int outCount, const char *name) {
    for (int i = 0; i < outCount; i++) {
        if (strcmp(out[i].name, name) == 0) {
            return out[i].count;
        }
    }
    return 0;
}

void counts_planet_occurrences(void) {
    const char *planets[] = {"Tatooine", "Hoth", "Tatooine", "Naboo", "Hoth", "Tatooine"};
    PlanetCount out[6];

    const int distinctCount = count_planets(planets, 6, out);

    assert(distinctCount == 3);
    assert(count_of(out, distinctCount, "Tatooine") == 3);
    assert(count_of(out, distinctCount, "Hoth") == 2);
    assert(count_of(out, distinctCount, "Naboo") == 1);
}

void handles_empty_array(void) {
    PlanetCount out[1];
    assert(count_planets(NULL, 0, out) == 0);
}

void handles_single_planet_repeated(void) {
    const char *planets[] = {"Coruscant", "Coruscant", "Coruscant"};
    PlanetCount out[3];

    const int distinctCount = count_planets(planets, 3, out);

    assert(distinctCount == 1);
    assert(count_of(out, distinctCount, "Coruscant") == 3);
}

void handles_all_different_planets(void) {
    const char *planets[] = {"Tatooine", "Hoth", "Naboo"};
    PlanetCount out[3];

    const int distinctCount = count_planets(planets, 3, out);

    assert(distinctCount == 3);
    assert(count_of(out, distinctCount, "Tatooine") == 1);
    assert(count_of(out, distinctCount, "Hoth") == 1);
    assert(count_of(out, distinctCount, "Naboo") == 1);
}

int main(void) {
    counts_planet_occurrences();
    handles_empty_array();
    handles_single_planet_repeated();
    handles_all_different_planets();

    printf("✅ All tests ran successfully\n");
    return 0;
}
