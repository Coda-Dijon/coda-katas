#include <assert.h>
#include <stdio.h>
#include "cloneSequence.h"

void assert_sequence_equals(const int *actual, const int actualCount, const int *expected, const int expectedCount) {
    assert(actualCount == expectedCount);
    for (int i = 0; i < expectedCount; i++) {
        assert(actual[i] == expected[i]);
    }
}

void generates_first_10_fibonacci_numbers(void) {
    const int expected[] = {0, 1, 1, 2, 3, 5, 8, 13, 21, 34};
    int out[10];

    assert_sequence_equals(out, clone_sequence(10, out), expected, 10);
}

void handles_n_equals_0(void) {
    int out[1];
    assert(clone_sequence(0, out) == 0);
}

void handles_n_equals_1(void) {
    const int expected[] = {0};
    int out[1];

    assert_sequence_equals(out, clone_sequence(1, out), expected, 1);
}

void handles_n_equals_2(void) {
    const int expected[] = {0, 1};
    int out[2];

    assert_sequence_equals(out, clone_sequence(2, out), expected, 2);
}

void handles_larger_sequence(void) {
    const int expected[] = {0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377};
    int out[15];

    assert_sequence_equals(out, clone_sequence(15, out), expected, 15);
}

int main(void) {
    generates_first_10_fibonacci_numbers();
    handles_n_equals_0();
    handles_n_equals_1();
    handles_n_equals_2();
    handles_larger_sequence();

    printf("✅ All tests ran successfully\n");
    return 0;
}
