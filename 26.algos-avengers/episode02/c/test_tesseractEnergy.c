#include <assert.h>
#include <stdio.h>
#include "tesseractEnergy.h"

void sums_all_energy(void) {
    const Avenger team[] = {
        {"Thor", 8000},
        {"Hulk", 12000}
    };
    assert(total_tesseract_energy(team, 2) == 20000);
}

void handles_empty_team(void) {
    assert(total_tesseract_energy(NULL, 0) == 0);
}

void handles_single_member(void) {
    const Avenger team[] = {{"Thor", 8000}};
    assert(total_tesseract_energy(team, 1) == 8000);
}

int main(void) {
    sums_all_energy();
    handles_empty_team();
    handles_single_member();

    printf("✅ All tests ran successfully\n");
    return 0;
}
