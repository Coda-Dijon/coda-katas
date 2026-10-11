#include <assert.h>
#include <stdio.h>
#include <string.h>
#include "invertedMessage.h"

void reverses_even_length_message(void) {
    char message[] = "ikol";
    reverse_message(message);
    assert(strcmp(message, "loki") == 0);
}

void reverses_odd_length_message(void) {
    char message[] = "toorg";
    reverse_message(message);
    assert(strcmp(message, "groot") == 0);
}

void handles_single_character(void) {
    char message[] = "a";
    reverse_message(message);
    assert(strcmp(message, "a") == 0);
}

void handles_empty_string(void) {
    char message[] = "";
    reverse_message(message);
    assert(strcmp(message, "") == 0);
}

int main(void) {
    reverses_even_length_message();
    reverses_odd_length_message();
    handles_single_character();
    handles_empty_string();

    printf("✅ All tests ran successfully\n");
    return 0;
}
