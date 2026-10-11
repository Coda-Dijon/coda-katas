#include <stdio.h>

#include "alertThreshold.h"

int main(void) {
    const Avenger team[] = {
        {"Thor", 8000},
        {"Hulk", 12000},
        {"Iron Man", 6000}
    };

    printf("Avengers above 7000: %d\n", count_above_threshold(team, 3, 7000));
    return 0;
}
