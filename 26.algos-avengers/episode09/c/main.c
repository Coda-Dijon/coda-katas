#include <stdio.h>

#include "invertedMessage.h"

int main(void) {
    char message[] = "ikol";

    reverse_message(message);
    printf("%s\n", message);
    return 0;
}
