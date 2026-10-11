#include <stdio.h>

#include "strongestAvenger.h"

int main(void) {
    const Avenger team[] = {
        {"Thor", 8000},
        {"Hulk", 12000},
        {"Iron Man", 6000}
    };

    const Avenger *strongest = strongest_avenger(team, 3);
    if (strongest != NULL) {
        printf("Strongest Avenger: %s (%d)\n", strongest->name, strongest->power);
    }
    return 0;
}
