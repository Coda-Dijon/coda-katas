import { describe, expect, it } from "vitest";
import { GildedRose, Item } from "./gildedRose";

describe("Gilded Rose", () => {
  it("decreases the quality by 1 for a normal item before the sell date", () => {
    const gildedRose = new GildedRose([new Item("foo", 10, 20)]);

    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(19);
  });
});
