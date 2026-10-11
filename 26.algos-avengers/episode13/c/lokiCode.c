#include <ctype.h>
#include <string.h>

#include "lokiCode.h"

static bool is_palindrome_rec(const char *text, int start, int end) {
    if (start >= end) {
        return true;
    }
    if (tolower(text[start]) != tolower(text[end])) {
        return false;
    }
    return is_palindrome_rec(text, start + 1, end - 1);
}

bool is_palindrome(const char *text) {
    return is_palindrome_rec(text, 0, (int) strlen(text) - 1);
}
