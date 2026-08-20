#include <stdio.h>

#include "skywalkerPower.h"

int main(void) {
    Jedi rey = {"Rey", 100, NULL, 0};
    Jedi *lukeChildren[] = {&rey};
    Jedi luke = {"Luke", 120, lukeChildren, 1};
    Jedi leia = {"Leia", 90, NULL, 0};
    Jedi *anakinChildren[] = {&luke, &leia};
    Jedi anakin = {"Anakin", 100, anakinChildren, 2};

    printf("Skywalker bloodline power: %d\n", skywalker_power(&anakin));
    return 0;
}
