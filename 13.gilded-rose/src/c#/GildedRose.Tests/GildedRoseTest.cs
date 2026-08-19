using Xunit;

namespace GildedRoseKata.Tests;

public class GildedRoseTest
{
    [Fact]
    public void QualityDecreasesByOneForANormalItemBeforeSellDate()
    {
        var items = new List<Item> { new Item("foo", 10, 20) };
        var app = new GildedRose(items);

        app.UpdateQuality();

        Assert.Equal(9, items[0].SellIn);
        Assert.Equal(19, items[0].Quality);
    }
}
