#include <stdlib.h>

#include "droidStack.h"

#define DROID_STACK_CAPACITY 128

struct DroidStack {
    void *items[DROID_STACK_CAPACITY];
    int count;
};

DroidStack *droid_stack_create(void) {
    return calloc(1, sizeof(DroidStack));
}

void droid_stack_destroy(DroidStack *stack) {
    free(stack);
}

void droid_stack_push(DroidStack *stack, void *droid) {
}

void *droid_stack_pop(DroidStack *stack) {
    return NULL;
}
