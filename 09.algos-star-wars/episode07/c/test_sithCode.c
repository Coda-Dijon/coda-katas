#include <assert.h>
#include <stdio.h>
#include "sithCode.h"

void detects_palindrome_codes(void) {
    assert(is_sith_code("radar") == true);
    assert(is_sith_code("kayak") == true);
    assert(is_sith_code("level") == true);
}

void detects_non_palindrome_codes(void) {
    assert(is_sith_code("sith") == false);
    assert(is_sith_code("empire") == false);
}

void handles_empty_string(void) {
    assert(is_sith_code("") == true);
}

void handles_single_character(void) {
    assert(is_sith_code("a") == true);
}

void ignores_spaces_and_case(void) {
    assert(is_sith_code("A man a plan a canal Panama") == true);
    assert(is_sith_code("Race Car") == true);
}

int main(void) {
    detects_palindrome_codes();
    detects_non_palindrome_codes();
    handles_empty_string();
    handles_single_character();
    ignores_spaces_and_case();

    printf("✅ All tests ran successfully\n");
    return 0;
}
