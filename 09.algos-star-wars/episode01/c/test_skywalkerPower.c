#include <assert.h>
#include <stdio.h>
#include "skywalkerPower.h"

void calculates_total_power_of_the_bloodline(void) {
    Jedi rey = {"Rey", 100, NULL, 0};
    Jedi *lukeChildren[] = {&rey};
    Jedi luke = {"Luke", 120, lukeChildren, 1};
    Jedi leia = {"Leia", 90, NULL, 0};
    Jedi *anakinChildren[] = {&luke, &leia};
    Jedi anakin = {"Anakin", 100, anakinChildren, 2};

    assert(skywalker_power(&anakin) == 410);
}

void handles_leaf_jedi(void) {
    const Jedi leaf = {"Rey", 100, NULL, 0};
    assert(skywalker_power(&leaf) == 100);
}

int main(void) {
    calculates_total_power_of_the_bloodline();
    handles_leaf_jedi();

    printf("✅ All tests ran successfully\n");
    return 0;
}
