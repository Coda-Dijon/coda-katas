#include <assert.h>
#include <stdio.h>
#include <string.h>
#include "repairStack.h"

void pops_in_reverse_push_order(void) {
    RepairStack *stack = repair_stack_create();

    repair_stack_push(stack, "Mark III");
    repair_stack_push(stack, "Mark IV");
    repair_stack_push(stack, "Mark V");

    assert(strcmp(repair_stack_pop(stack), "Mark V") == 0);
    assert(strcmp(repair_stack_pop(stack), "Mark IV") == 0);
    assert(strcmp(repair_stack_pop(stack), "Mark III") == 0);

    repair_stack_destroy(stack);
}

void pop_on_empty_stack_returns_null(void) {
    RepairStack *stack = repair_stack_create();

    assert(repair_stack_pop(stack) == NULL);

    repair_stack_destroy(stack);
}

void pop_after_emptying_returns_null(void) {
    RepairStack *stack = repair_stack_create();

    repair_stack_push(stack, "Mark III");
    repair_stack_pop(stack);

    assert(repair_stack_pop(stack) == NULL);

    repair_stack_destroy(stack);
}

int main(void) {
    pops_in_reverse_push_order();
    pop_on_empty_stack_returns_null();
    pop_after_emptying_returns_null();

    printf("✅ All tests ran successfully\n");
    return 0;
}
