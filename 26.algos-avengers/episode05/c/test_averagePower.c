#include <assert.h>
#include <math.h>
#include <stdio.h>
#include "averagePower.h"

void computes_exact_average(void) {
    const Avenger team[] = {
        {"Thor", 8000},
        {"Hulk", 12000},
        {"Iron Man", 10000}
    };
    assert(fabs(average_power(team, 3) - 10000.0) < 0.0001);
}

void computes_non_exact_average(void) {
    const Avenger team[] = {
        {"Thor", 8000},
        {"Hulk", 12000},
        {"Iron Man", 6000}
    };
    assert(fabs(average_power(team, 3) - (26000.0 / 3.0)) < 0.0001);
}

void handles_empty_team(void) {
    assert(fabs(average_power(NULL, 0) - 0.0) < 0.0001);
}

void handles_single_member(void) {
    const Avenger team[] = {{"Thor", 8000}};
    assert(fabs(average_power(team, 1) - 8000.0) < 0.0001);
}

int main(void) {
    computes_exact_average();
    computes_non_exact_average();
    handles_empty_team();
    handles_single_member();

    printf("✅ All tests ran successfully\n");
    return 0;
}
