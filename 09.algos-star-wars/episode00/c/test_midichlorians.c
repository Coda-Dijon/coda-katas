#include <assert.h>
#include <stdio.h>
#include "midichlorians.h"

void sums_all_midichlorians(void) {
    const Jedi jedis[] = {
        {"Luke", 8000},
        {"Yoda", 12000}
    };
    assert(total_midichlorians(jedis, 2) == 20000);
}

void handles_empty_list(void) {
    assert(total_midichlorians(NULL, 0) == 0);
}

int main(void) {
    sums_all_midichlorians();
    handles_empty_list();

    printf("✅ All tests ran successfully\n");
    return 0;
}
