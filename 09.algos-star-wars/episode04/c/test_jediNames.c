#include <assert.h>
#include <stdio.h>
#include <string.h>
#include "jediNames.h"

void assert_names_equal(const char **actual, const int actualCount, const char **expected, const int expectedCount) {
    assert(actualCount == expectedCount);
    for (int i = 0; i < expectedCount; i++) {
        assert(strcmp(actual[i], expected[i]) == 0);
    }
}

void removes_duplicate_jedi_names(void) {
    const char *names[] = {"Luke", "Yoda", "Luke", "Obi-Wan", "Yoda"};
    const char *expected[] = {"Luke", "Yoda", "Obi-Wan"};
    const char *out[5];

    assert_names_equal(out, unique_jedi_names(names, 5, out), expected, 3);
}

void handles_empty_array(void) {
    const char *out[1];
    assert(unique_jedi_names(NULL, 0, out) == 0);
}

void handles_array_with_no_duplicates(void) {
    const char *names[] = {"Luke", "Yoda", "Obi-Wan"};
    const char *out[3];

    assert_names_equal(out, unique_jedi_names(names, 3, out), names, 3);
}

void handles_array_with_all_same_names(void) {
    const char *names[] = {"Yoda", "Yoda", "Yoda"};
    const char *expected[] = {"Yoda"};
    const char *out[3];

    assert_names_equal(out, unique_jedi_names(names, 3, out), expected, 1);
}

int main(void) {
    removes_duplicate_jedi_names();
    handles_empty_array();
    handles_array_with_no_duplicates();
    handles_array_with_all_same_names();

    printf("✅ All tests ran successfully\n");
    return 0;
}
