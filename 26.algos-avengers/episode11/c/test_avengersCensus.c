#include <assert.h>
#include <stdio.h>
#include <string.h>
#include "avengersCensus.h"

void counts_occurrences_keeping_order(void) {
    const char *names[] = {"Thor", "Hulk", "Thor", "Iron Man", "Hulk", "Thor"};
    const char *outNames[6];
    int outCounts[6];

    const int distinctCount = census(names, 6, outNames, outCounts);

    assert(distinctCount == 3);
    assert(strcmp(outNames[0], "Thor") == 0);
    assert(outCounts[0] == 3);
    assert(strcmp(outNames[1], "Hulk") == 0);
    assert(outCounts[1] == 2);
    assert(strcmp(outNames[2], "Iron Man") == 0);
    assert(outCounts[2] == 1);
}

void handles_empty_list(void) {
    const char *outNames[1];
    int outCounts[1];
    assert(census(NULL, 0, outNames, outCounts) == 0);
}

void handles_single_name_repeated(void) {
    const char *names[] = {"Thor", "Thor", "Thor"};
    const char *outNames[3];
    int outCounts[3];

    const int distinctCount = census(names, 3, outNames, outCounts);

    assert(distinctCount == 1);
    assert(strcmp(outNames[0], "Thor") == 0);
    assert(outCounts[0] == 3);
}

int main(void) {
    counts_occurrences_keeping_order();
    handles_empty_list();
    handles_single_name_repeated();

    printf("✅ All tests ran successfully\n");
    return 0;
}
