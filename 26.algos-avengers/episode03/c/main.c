#include <stdio.h>

#include "avengersScanner.h"

int main(void) {
    const Avenger team[] = {
        {"Thor", 8000},
        {"Hulk", 12000}
    };

    printf("Is Hulk present? %s\n", is_avenger_present(team, 2, "Hulk") ? "yes" : "no");
    printf("Is Loki present? %s\n", is_avenger_present(team, 2, "Loki") ? "yes" : "no");
    return 0;
}
