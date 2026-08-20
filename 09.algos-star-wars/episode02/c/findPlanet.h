#ifndef FIND_PLANET_H
#define FIND_PLANET_H

#include <stdbool.h>

typedef struct Planet {
    const char *name;
    struct Planet **satellites;
    int satelliteCount;
} Planet;

bool find_planet(const Planet *root, const char *target);

#endif
