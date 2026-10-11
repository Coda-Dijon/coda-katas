#ifndef TESSERACT_ENERGY_H
#define TESSERACT_ENERGY_H

typedef struct {
    const char *name;
    int power;
} Avenger;

int total_tesseract_energy(const Avenger *team, int count);

#endif
