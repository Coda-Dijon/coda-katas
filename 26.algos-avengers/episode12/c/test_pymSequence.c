#include <assert.h>
#include <stdio.h>
#include "pymSequence.h"

void generates_first_eight_terms(void) {
    long out[8];
    pym_sequence(8, out);

    const long expected[] = {0, 1, 1, 2, 3, 5, 8, 13};
    for (int i = 0; i < 8; i++) {
        assert(out[i] == expected[i]);
    }
}

void handles_zero_terms(void) {
    long out[1];
    pym_sequence(0, out);
}

void handles_one_term(void) {
    long out[1];
    pym_sequence(1, out);
    assert(out[0] == 0);
}

void handles_two_terms(void) {
    long out[2];
    pym_sequence(2, out);
    assert(out[0] == 0);
    assert(out[1] == 1);
}

int main(void) {
    generates_first_eight_terms();
    handles_zero_terms();
    handles_one_term();
    handles_two_terms();

    printf("✅ All tests ran successfully\n");
    return 0;
}
