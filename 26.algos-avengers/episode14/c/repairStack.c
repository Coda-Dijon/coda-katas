#include <stddef.h>

#include "repairStack.h"

#define REPAIR_STACK_CAPACITY 16

struct RepairStack {
    const char *items[REPAIR_STACK_CAPACITY];
    int count;
};

RepairStack *repair_stack_create(void) {
    return NULL;
}

void repair_stack_destroy(RepairStack *stack) {
}

void repair_stack_push(RepairStack *stack, const char *suit_name) {
}

const char *repair_stack_pop(RepairStack *stack) {
    return NULL;
}
