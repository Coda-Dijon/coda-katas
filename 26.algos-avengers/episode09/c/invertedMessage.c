#include <string.h>

#include "invertedMessage.h"

void reverse_message(char *message) {
    int start = 0;
    int end = (int) strlen(message) - 1;
    while (start < end) {
        const char tmp = message[start];
        message[start] = message[end];
        message[end] = tmp;
        start++;
        end--;
    }
}
