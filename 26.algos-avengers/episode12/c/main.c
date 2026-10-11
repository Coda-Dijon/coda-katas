#include <stdio.h>

#include "pymSequence.h"

int main(void) {
    long out[8];

    pym_sequence(8, out);

    for (int i = 0; i < 8; i++) {
        printf("%ld ", out[i]);
    }
    printf("\n");
    return 0;
}
