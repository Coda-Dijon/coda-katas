#include <assert.h>
#include <stdio.h>
#include "avengersScanner.h"

void finds_present_avenger(void) {
    const Avenger team[] = {
        {"Thor", 8000},
        {"Hulk", 12000}
    };
    assert(is_avenger_present(team, 2, "Hulk") == true);
}

void does_not_find_absent_avenger(void) {
    const Avenger team[] = {
        {"Thor", 8000},
        {"Hulk", 12000}
    };
    assert(is_avenger_present(team, 2, "Ultron") == false);
}

void handles_empty_team(void) {
    assert(is_avenger_present(NULL, 0, "Thor") == false);
}

void finds_last_avenger(void) {
    const Avenger team[] = {
        {"Thor", 8000},
        {"Hulk", 12000},
        {"Loki", 6000}
    };
    assert(is_avenger_present(team, 3, "Loki") == true);
}

int main(void) {
    finds_present_avenger();
    does_not_find_absent_avenger();
    handles_empty_team();
    finds_last_avenger();

    printf("✅ All tests ran successfully\n");
    return 0;
}
