#include "averagePower.h"

double average_power(const Avenger *team, const int count) {
    if (count == 0) {
        return 0.0;
    }
    int total = 0;
    for (int i = 0; i < count; i++) {
        total += team[i].power;
    }
    return (double) total / (double) count;
}
