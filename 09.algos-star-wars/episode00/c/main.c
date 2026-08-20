#include <stdio.h>

#include "midichlorians.h"

int main(void) {
    const Jedi jedis[] = {
        {"Luke", 8000},
        {"Yoda", 12000}
    };

    printf("Total midichlorians: %d\n", total_midichlorians(jedis, 2));
    return 0;
}
