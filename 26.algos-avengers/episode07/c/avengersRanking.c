#include "avengersRanking.h"

static void swap(Avenger *a, Avenger *b) {
    const Avenger tmp = *a;
    *a = *b;
    *b = tmp;
}

void sort_by_power(Avenger *team, const int count) {
    for (int i = 0; i < count - 1; i++) {
        for (int j = 0; j < count - 1 - i; j++) {
            if (team[j].power > team[j + 1].power) {
                swap(&team[j], &team[j + 1]);
            }
        }
    }
}
