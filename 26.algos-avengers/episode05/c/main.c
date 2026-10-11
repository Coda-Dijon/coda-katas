#include <stdio.h>

#include "averagePower.h"

int main(void) {
    const Avenger team[] = {
        {"Thor", 8000},
        {"Hulk", 12000},
        {"Iron Man", 6000}
    };

    printf("Average power: %.2f\n", average_power(team, 3));
    return 0;
}
