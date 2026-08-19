#include <assert.h>
#include <stdio.h>
#include <string.h>
#include "gilded_rose.h"

void quality_decreases_by_one_for_a_normal_item(void) {
    Item items[] = {{"foo", 10, 20}};
    update_quality(items, 1);
    assert(items[0].sell_in == 9);
    assert(items[0].quality == 19);
}

int main(void) {
    quality_decreases_by_one_for_a_normal_item();

    printf("✅ All tests ran successfully\n");
    return 0;
}
