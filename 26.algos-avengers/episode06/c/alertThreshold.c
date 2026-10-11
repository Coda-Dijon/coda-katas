#include "alertThreshold.h"

int count_above_threshold(const Avenger *team, const int count, const int threshold) {
    int total = 0;
    for (int i = 0; i < count; i++) {
        if (team[i].power > threshold) {
            total++;
        }
    }
    return total;
}
