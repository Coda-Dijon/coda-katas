#ifndef MIDICHLORIANS_H
#define MIDICHLORIANS_H

typedef struct {
    const char *name;
    int midichlorians;
} Jedi;

int total_midichlorians(const Jedi *jedis, int count);

#endif
