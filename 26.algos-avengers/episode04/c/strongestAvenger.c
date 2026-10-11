#include <stddef.h>

#include "strongestAvenger.h"

const Avenger *strongest_avenger(const Avenger *team, const int count) {
    if (count == 0) {
        return NULL;
    }
    const Avenger *strongest = &team[0];
    for (int i = 1; i < count; i++) {
        if (team[i].power > strongest->power) {
            strongest = &team[i];
        }
    }
    return strongest;
}
