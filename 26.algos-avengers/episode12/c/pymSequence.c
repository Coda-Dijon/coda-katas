#include "pymSequence.h"

void pym_sequence(const int n, long *out) {
    long previous = 0;
    long current = 1;
    for (int i = 0; i < n; i++) {
        out[i] = previous;
        const long next = previous + current;
        previous = current;
        current = next;
    }
}
