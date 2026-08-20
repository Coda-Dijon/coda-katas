#ifndef DROID_STACK_H
#define DROID_STACK_H

typedef struct DroidStack DroidStack;

DroidStack *droid_stack_create(void);
void droid_stack_destroy(DroidStack *stack);
void droid_stack_push(DroidStack *stack, void *droid);
void *droid_stack_pop(DroidStack *stack);

#endif
