#ifndef GILDED_ROSE_H
#define GILDED_ROSE_H

#define ITEM_NAME_MAX 64

typedef struct {
    char name[ITEM_NAME_MAX];
    int sell_in;
    int quality;
} Item;

void update_quality(Item items[], int items_count);

#endif
