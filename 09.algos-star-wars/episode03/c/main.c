#include <stdio.h>

#include "droidStack.h"

int main(void) {
    DroidStack *hangar = droid_stack_create();

    droid_stack_push(hangar, "R2-D2");
    droid_stack_push(hangar, "C-3PO");

    const char *next = (const char *) droid_stack_pop(hangar);
    printf("Next droid to leave: %s\n", next ? next : "(none)");

    droid_stack_destroy(hangar);
    return 0;
}
