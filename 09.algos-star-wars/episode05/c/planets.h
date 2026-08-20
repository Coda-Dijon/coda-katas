#ifndef PLANETS_H
#define PLANETS_H

typedef struct {
    const char *name;
    int count;
} PlanetCount;

/**
 * Writes each distinct planet with its occurrence count into `out`.
 * `out` must be able to hold up to `count` entries.
 * Returns the number of distinct planets written.
 */
int count_planets(const char **planets, int count, PlanetCount *out);

#endif
