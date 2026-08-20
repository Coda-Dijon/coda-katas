#include <assert.h>
#include <stdio.h>
#include "findPlanet.h"

void finds_planets_in_the_galaxy(void) {
    Planet alderaan = {"Alderaan", NULL, 0};
    Planet *nabooSatellites[] = {&alderaan};
    Planet naboo = {"Naboo", nabooSatellites, 1};
    Planet *tatooineSatellites[] = {&naboo};
    Planet tatooine = {"Tatooine", tatooineSatellites, 1};

    Planet dagobah = {"Dagobah", NULL, 0};
    Planet endor = {"Endor", NULL, 0};
    Planet *hothSatellites[] = {&dagobah, &endor};
    Planet hoth = {"Hoth", hothSatellites, 2};

    Planet geonosis = {"Geonosis", NULL, 0};
    Planet *mustafarSatellites[] = {&geonosis};
    Planet mustafar = {"Mustafar", mustafarSatellites, 1};

    Planet *galaxySatellites[] = {&tatooine, &hoth, &mustafar};
    const Planet galaxy = {"Coruscant", galaxySatellites, 3};

    const char *targets[] = {
        "Naboo", "Endor", "Geonosis", "Coruscant", "Hoth",
        "Tatooine", "Dagobah", "Alderaan", "Mustafar", "Yavin"
    };
    const bool expected[] = {true, true, true, true, true, true, true, true, true, false};

    for (int i = 0; i < 10; i++) {
        assert(find_planet(&galaxy, targets[i]) == expected[i]);
    }
}

int main(void) {
    finds_planets_in_the_galaxy();

    printf("✅ All tests ran successfully\n");
    return 0;
}
