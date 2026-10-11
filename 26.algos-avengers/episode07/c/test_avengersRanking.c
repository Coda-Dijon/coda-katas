#include <assert.h>
#include <stdio.h>
#include <string.h>
#include "avengersRanking.h"

void sorts_by_ascending_power(void) {
    Avenger team[] = {
        {"Hulk", 12000},
        {"Iron Man", 6000},
        {"Thor", 8000}
    };
    sort_by_power(team, 3);

    assert(strcmp(team[0].name, "Iron Man") == 0);
    assert(strcmp(team[1].name, "Thor") == 0);
    assert(strcmp(team[2].name, "Hulk") == 0);
}

void handles_already_sorted(void) {
    Avenger team[] = {
        {"Iron Man", 6000},
        {"Thor", 8000},
        {"Hulk", 12000}
    };
    sort_by_power(team, 3);

    assert(strcmp(team[0].name, "Iron Man") == 0);
    assert(strcmp(team[1].name, "Thor") == 0);
    assert(strcmp(team[2].name, "Hulk") == 0);
}

void handles_single_member(void) {
    Avenger team[] = {{"Thor", 8000}};
    sort_by_power(team, 1);

    assert(strcmp(team[0].name, "Thor") == 0);
}

void handles_equal_power(void) {
    Avenger team[] = {
        {"Thor", 8000},
        {"Iron Man", 8000}
    };
    sort_by_power(team, 2);

    assert(team[0].power == 8000);
    assert(team[1].power == 8000);
}

int main(void) {
    sorts_by_ascending_power();
    handles_already_sorted();
    handles_single_member();
    handles_equal_power();

    printf("✅ All tests ran successfully\n");
    return 0;
}
