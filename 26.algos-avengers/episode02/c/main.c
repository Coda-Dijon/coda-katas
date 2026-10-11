#include <stdio.h>

#include "tesseractEnergy.h"

int main(void) {
    const Avenger team[] = {
        {"Thor", 8000},
        {"Hulk", 12000}
    };

    printf("Total tesseract energy: %d\n", total_tesseract_energy(team, 2));
    return 0;
}
