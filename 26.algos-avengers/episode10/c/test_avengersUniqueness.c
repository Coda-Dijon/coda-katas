#include <assert.h>
#include <stdio.h>
#include <string.h>
#include "avengersUniqueness.h"

void removes_duplicates_keeping_order(void) {
    const char *names[] = {"Thor", "Hulk", "Thor", "Iron Man", "Hulk"};
    const char *out[5];

    const int uniqueCount = unique_avenger_names(names, 5, out);

    assert(uniqueCount == 3);
    assert(strcmp(out[0], "Thor") == 0);
    assert(strcmp(out[1], "Hulk") == 0);
    assert(strcmp(out[2], "Iron Man") == 0);
}

void handles_empty_list(void) {
    const char *out[1];
    assert(unique_avenger_names(NULL, 0, out) == 0);
}

void handles_no_duplicates(void) {
    const char *names[] = {"Thor", "Hulk", "Iron Man"};
    const char *out[3];

    const int uniqueCount = unique_avenger_names(names, 3, out);

    assert(uniqueCount == 3);
    assert(strcmp(out[0], "Thor") == 0);
    assert(strcmp(out[1], "Hulk") == 0);
    assert(strcmp(out[2], "Iron Man") == 0);
}

void handles_only_duplicates(void) {
    const char *names[] = {"Thor", "Thor", "Thor"};
    const char *out[3];

    const int uniqueCount = unique_avenger_names(names, 3, out);

    assert(uniqueCount == 1);
    assert(strcmp(out[0], "Thor") == 0);
}

int main(void) {
    removes_duplicates_keeping_order();
    handles_empty_list();
    handles_no_duplicates();
    handles_only_duplicates();

    printf("✅ All tests ran successfully\n");
    return 0;
}
