#ifndef REPAIR_STACK_H
#define REPAIR_STACK_H

typedef struct RepairStack RepairStack;

RepairStack *repair_stack_create(void);
void repair_stack_destroy(RepairStack *stack);
void repair_stack_push(RepairStack *stack, const char *suit_name);
const char *repair_stack_pop(RepairStack *stack);

#endif
