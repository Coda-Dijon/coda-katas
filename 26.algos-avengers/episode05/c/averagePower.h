#ifndef AVERAGE_POWER_H
#define AVERAGE_POWER_H

typedef struct {
    const char *name;
    int power;
} Avenger;

double average_power(const Avenger *team, int count);

#endif
