#ifndef SKYWALKER_POWER_H
#define SKYWALKER_POWER_H

typedef struct Jedi {
    const char *name;
    int power;
    struct Jedi **children;
    int childrenCount;
} Jedi;

int skywalker_power(const Jedi *root);

#endif
