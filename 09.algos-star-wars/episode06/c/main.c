#include <stdio.h>

#include "cloneSequence.h"

int main(void) {
    int sequence[10];
    const int count = clone_sequence(10, sequence);

    printf("Clone sequence: ");
    for (int i = 0; i < count; i++) {
        printf("%d ", sequence[i]);
    }
    printf("\n");
    return 0;
}
