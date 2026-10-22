#include <assert.h>
#include <stdio.h>
#include "visionProtocol.h"

void rejects_numbers_below_two(void) {
    assert(is_prime(-7) == false);
    assert(is_prime(0) == false);
    assert(is_prime(1) == false);
}

void accepts_two_the_only_even_prime(void) {
    assert(is_prime(2) == true);
}

void rejects_even_numbers_above_two(void) {
    assert(is_prime(4) == false);
    assert(is_prime(100) == false);
}

void accepts_known_primes(void) {
    assert(is_prime(7) == true);
    assert(is_prime(17) == true);
    assert(is_prime(97) == true);
}

void rejects_known_composites(void) {
    assert(is_prime(15) == false);
    assert(is_prime(91) == false); // 7 x 13, piège classique
}

int main(void) {
    rejects_numbers_below_two();
    accepts_two_the_only_even_prime();
    rejects_even_numbers_above_two();
    accepts_known_primes();
    rejects_known_composites();

    printf("✅ All tests ran successfully\n");
    return 0;
}
