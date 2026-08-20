#include <assert.h>
#include <stdio.h>
#include <string.h>
#include "droidStack.h"

void manages_droids_in_lifo_order(void) {
    DroidStack *hangar = droid_stack_create();

    droid_stack_push(hangar, "R2-D2");
    droid_stack_push(hangar, "C-3PO");

    const char *first = (const char *) droid_stack_pop(hangar);
    assert(first != NULL);
    assert(strcmp(first, "C-3PO") == 0);

    const char *second = (const char *) droid_stack_pop(hangar);
    assert(second != NULL);
    assert(strcmp(second, "R2-D2") == 0);

    droid_stack_destroy(hangar);
}

void returns_null_when_no_droid(void) {
    DroidStack *hangar = droid_stack_create();

    assert(droid_stack_pop(hangar) == NULL);

    droid_stack_destroy(hangar);
}

int main(void) {
    manages_droids_in_lifo_order();
    returns_null_when_no_droid();

    printf("✅ All tests ran successfully\n");
    return 0;
}
