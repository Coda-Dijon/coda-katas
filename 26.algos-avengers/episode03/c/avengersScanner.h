#ifndef AVENGERS_SCANNER_H
#define AVENGERS_SCANNER_H

#include <stdbool.h>

typedef struct {
    const char *name;
    int power;
} Avenger;

bool is_avenger_present(const Avenger *team, int count, const char *name);

#endif
