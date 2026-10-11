#ifndef STRONGEST_AVENGER_H
#define STRONGEST_AVENGER_H

typedef struct {
    const char *name;
    int power;
} Avenger;

const Avenger *strongest_avenger(const Avenger *team, int count);

#endif
