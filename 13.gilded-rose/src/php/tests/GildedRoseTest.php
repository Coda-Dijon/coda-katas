<?php

use Kata\GildedRose;
use Kata\Item;

it('decreases quality by 1 for a normal item before the sell date', function () {
    $gildedRose = new GildedRose([new Item('foo', 10, 20)]);
    $gildedRose->updateQuality();

    $items = $gildedRose->getItems();
    expect($items[0]->sellIn)->toBe(9);
    expect($items[0]->quality)->toBe(19);
});
