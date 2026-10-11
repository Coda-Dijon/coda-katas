#include <stdio.h>

#include "lokiCode.h"

int main(void) {
    printf("Is \"Kayak\" a palindrome? %s\n", is_palindrome("Kayak") ? "yes" : "no");
    printf("Is \"Thor\" a palindrome? %s\n", is_palindrome("Thor") ? "yes" : "no");
    return 0;
}
