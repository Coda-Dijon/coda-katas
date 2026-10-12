#include <assert.h>
#include <stdio.h>
#include <string.h>
#include "doomMainframe.h"

void finds_password_from_known_prefix(void) {
    const CrackResult result = crack_doom_password("Avengers", 4);

    assert(strcmp(result.password, "Avengers#92") == 0);
    assert(matches_doom_rules(result.password));
}

void returns_no_password_when_suffix_too_short(void) {
    const CrackResult result = crack_doom_password("Avengers", 2);

    assert(strcmp(result.password, "") == 0);
}

void counts_only_candidates_that_respect_the_rules(void) {
    const CrackResult result = crack_doom_password("Avengers", 4);

    assert(result.attempts > 0);
    assert(result.attempts < 1000000); // le préfixe doit réduire l'espace, pas l'exploser
}

int main(void) {
    finds_password_from_known_prefix();
    returns_no_password_when_suffix_too_short();
    counts_only_candidates_that_respect_the_rules();

    printf("✅ All tests ran successfully\n");
    return 0;
}
