#ifndef ALERT_THRESHOLD_H
#define ALERT_THRESHOLD_H

typedef struct {
    const char *name;
    int power;
} Avenger;

int count_above_threshold(const Avenger *team, int count, int threshold);

#endif
