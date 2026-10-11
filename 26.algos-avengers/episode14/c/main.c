#include <stdio.h>

#include "repairStack.h"

int main(void) {
    RepairStack *stack = repair_stack_create();

    repair_stack_push(stack, "Mark III");
    repair_stack_push(stack, "Mark IV");

    printf("Repairing: %s\n", repair_stack_pop(stack));
    printf("Repairing: %s\n", repair_stack_pop(stack));

    repair_stack_destroy(stack);
    return 0;
}
