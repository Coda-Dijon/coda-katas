#include <assert.h>
#include <stdio.h>
#include <string.h>
#include "strongestAvenger.h"

void finds_the_strongest(void) {
    const Avenger team[] = {
        {"Thor", 8000},
        {"Hulk", 12000},
        {"Iron Man", 6000}
    };
    const Avenger *strongest = strongest_avenger(team, 3);
    assert(strongest != NULL);
    assert(strcmp(strongest->name, "Hulk") == 0);
}

void handles_empty_team(void) {
    assert(strongest_avenger(NULL, 0) == NULL);
}

void handles_single_member(void) {
    const Avenger team[] = {{"Thor", 8000}};
    const Avenger *strongest = strongest_avenger(team, 1);
    assert(strongest != NULL);
    assert(strcmp(strongest->name, "Thor") == 0);
}

void returns_first_on_tie(void) {
    const Avenger team[] = {
        {"Thor", 8000},
        {"Iron Man", 8000}
    };
    const Avenger *strongest = strongest_avenger(team, 2);
    assert(strongest != NULL);
    assert(strcmp(strongest->name, "Thor") == 0);
}

int main(void) {
    finds_the_strongest();
    handles_empty_team();
    handles_single_member();
    returns_first_on_tie();

    printf("✅ All tests ran successfully\n");
    return 0;
}
