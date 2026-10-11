#include <assert.h>
#include <stdio.h>
#include "alertThreshold.h"

void counts_members_above_threshold(void) {
    const Avenger team[] = {
        {"Thor", 8000},
        {"Hulk", 12000},
        {"Iron Man", 6000}
    };
    assert(count_above_threshold(team, 3, 7000) == 2);
}

void handles_empty_team(void) {
    assert(count_above_threshold(NULL, 0, 1000) == 0);
}

void handles_nobody_above(void) {
    const Avenger team[] = {
        {"Hawkeye", 3000},
        {"Black Widow", 3500}
    };
    assert(count_above_threshold(team, 2, 9000) == 0);
}

void handles_everybody_above(void) {
    const Avenger team[] = {
        {"Thor", 8000},
        {"Hulk", 12000}
    };
    assert(count_above_threshold(team, 2, 1000) == 2);
}

int main(void) {
    counts_members_above_threshold();
    handles_empty_team();
    handles_nobody_above();
    handles_everybody_above();

    printf("✅ All tests ran successfully\n");
    return 0;
}
