#include <stdlib.h>

#include "repairStack.h"

#define REPAIR_STACK_CAPACITY 16

struct RepairStack {
    const char *items[REPAIR_STACK_CAPACITY];
    int count;
};

RepairStack *repair_stack_create(void) {
    RepairStack *stack = malloc(sizeof(RepairStack));
    stack->count = 0;
    return stack;
}

void repair_stack_destroy(RepairStack *stack) {
    free(stack);
}

void repair_stack_push(RepairStack *stack, const char *suit_name) {
    stack->items[stack->count] = suit_name;
    stack->count++;
}

const char *repair_stack_pop(RepairStack *stack) {
    if (stack->count == 0) {
        return NULL;
    }
    stack->count--;
    return stack->items[stack->count];
}
