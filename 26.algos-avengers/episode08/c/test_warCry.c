#include <assert.h>
#include <stdio.h>
#include <string.h>
#include "warCry.h"

void converts_lowercase_name(void) {
    char name[] = "thor";
    to_war_cry(name);
    assert(strcmp(name, "THOR") == 0);
}

void converts_name_with_space(void) {
    char name[] = "Iron Man";
    to_war_cry(name);
    assert(strcmp(name, "IRON MAN") == 0);
}

void handles_already_uppercase(void) {
    char name[] = "HULK";
    to_war_cry(name);
    assert(strcmp(name, "HULK") == 0);
}

void handles_empty_string(void) {
    char name[] = "";
    to_war_cry(name);
    assert(strcmp(name, "") == 0);
}

int main(void) {
    converts_lowercase_name();
    converts_name_with_space();
    handles_already_uppercase();
    handles_empty_string();

    printf("✅ All tests ran successfully\n");
    return 0;
}
