#ifndef AVENGERS_RANKING_H
#define AVENGERS_RANKING_H

typedef struct {
    const char *name;
    int power;
} Avenger;

void sort_by_power(Avenger *team, int count);

#endif
