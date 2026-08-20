#include <stdio.h>

#include "findPlanet.h"

int main(void) {
    Planet naboo = {"Naboo", NULL, 0};
    Planet *tatooineSatellites[] = {&naboo};
    Planet tatooine = {"Tatooine", tatooineSatellites, 1};

    Planet alderaan = {"Alderaan", NULL, 0};
    Planet *hothSatellites[] = {&alderaan};
    Planet hoth = {"Hoth", hothSatellites, 1};

    Planet *galaxySatellites[] = {&tatooine, &hoth};
    const Planet galaxy = {"Coruscant", galaxySatellites, 2};

    printf("Naboo found: %s\n", find_planet(&galaxy, "Naboo") ? "true" : "false");
    return 0;
}
