#include <stdio.h>

#include "warCry.h"

int main(void) {
    char name[] = "Iron Man";

    to_war_cry(name);
    printf("%s\n", name);
    return 0;
}
