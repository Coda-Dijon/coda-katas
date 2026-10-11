#include "tesseractEnergy.h"

int total_tesseract_energy(const Avenger *team, const int count) {
    int total = 0;
    for (int i = 0; i < count; i++) {
        total += team[i].power;
    }
    return total;
}
