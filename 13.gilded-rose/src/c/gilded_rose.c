#include <string.h>
#include "gilded_rose.h"

static int is_item(const Item *item, const char *name) {
    return strcmp(item->name, name) == 0;
}

void update_quality(Item items[], int items_count) {
    for (int i = 0; i < items_count; i++) {
        if (!is_item(&items[i], "Aged Brie")
                && !is_item(&items[i], "Backstage passes to a TAFKAL80ETC concert")) {
            if (items[i].quality > 0) {
                if (!is_item(&items[i], "Sulfuras, Hand of Ragnaros")) {
                    items[i].quality = items[i].quality - 1;
                }
            }
        } else {
            if (items[i].quality < 50) {
                items[i].quality = items[i].quality + 1;

                if (is_item(&items[i], "Backstage passes to a TAFKAL80ETC concert")) {
                    if (items[i].sell_in < 11) {
                        if (items[i].quality < 50) {
                            items[i].quality = items[i].quality + 1;
                        }
                    }

                    if (items[i].sell_in < 6) {
                        if (items[i].quality < 50) {
                            items[i].quality = items[i].quality + 1;
                        }
                    }
                }
            }
        }

        if (!is_item(&items[i], "Sulfuras, Hand of Ragnaros")) {
            items[i].sell_in = items[i].sell_in - 1;
        }

        if (items[i].sell_in < 0) {
            if (!is_item(&items[i], "Aged Brie")) {
                if (!is_item(&items[i], "Backstage passes to a TAFKAL80ETC concert")) {
                    if (items[i].quality > 0) {
                        if (!is_item(&items[i], "Sulfuras, Hand of Ragnaros")) {
                            items[i].quality = items[i].quality - 1;
                        }
                    }
                } else {
                    items[i].quality = items[i].quality - items[i].quality;
                }
            } else {
                if (items[i].quality < 50) {
                    items[i].quality = items[i].quality + 1;
                }
            }
        }
    }
}
