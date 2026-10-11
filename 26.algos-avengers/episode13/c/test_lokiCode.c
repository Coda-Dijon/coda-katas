#include <assert.h>
#include <stdio.h>
#include "lokiCode.h"

void recognizes_a_palindrome(void) {
    assert(is_palindrome("radar") == true);
}

void rejects_a_non_palindrome(void) {
    assert(is_palindrome("thor") == false);
}

void ignores_case(void) {
    assert(is_palindrome("Kayak") == true);
}

void handles_empty_string(void) {
    assert(is_palindrome("") == true);
}

void handles_single_character(void) {
    assert(is_palindrome("a") == true);
}

int main(void) {
    recognizes_a_palindrome();
    rejects_a_non_palindrome();
    ignores_case();
    handles_empty_string();
    handles_single_character();

    printf("✅ All tests ran successfully\n");
    return 0;
}
