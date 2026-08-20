#include <stdio.h>

#include "sithCode.h"

int main(void) {
    printf("Is \"radar\" a sith code? %s\n", is_sith_code("radar") ? "true" : "false");
    return 0;
}
