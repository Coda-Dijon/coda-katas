#include <stdio.h>

#include "avengersRanking.h"

int main(void) {
    Avenger team[] = {
        {"Hulk", 12000},
        {"Iron Man", 6000},
        {"Thor", 8000}
    };

    sort_by_power(team, 3);

    for (int i = 0; i < 3; i++) {
        printf("%s: %d\n", team[i].name, team[i].power);
    }
    return 0;
}
