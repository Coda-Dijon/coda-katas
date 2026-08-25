using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using FluentAssertions;
using Xunit;
using LinqWorkshop.Tests.RealWorld.Watch;
using static System.IO.File;
using static System.Text.Json.JsonSerializer;

namespace LinqWorkshop.Tests.RealWorld;

public class WatchFixture
{
    public Component Watch { get; }

    public WatchFixture()
    {
        Watch = Deserialize<Component>(
            ReadAllText("03-real-world/watch.json"),
            new JsonSerializerOptions {PropertyNameCaseInsensitive = true}
        )!;
    }
}

public class RealWorld : IClassFixture<WatchFixture>
{
    private readonly Component _watch;

    public RealWorld(WatchFixture fixture) => _watch = fixture.Watch;

    [Fact]
    public void AllComponents()
    {
        var totalCount = 0;

        totalCount.Should().Be(564);
    }

    [Fact]
    public void Markers()
    {
        IEnumerable<Component> markers = null;

        markers.Count().Should().Be(14);
        markers.Select(m => m.Name).Should().BeEquivalentTo(new List<string>
        {
            "Markers 305",
            "Markers 142",
            "Markers 243",
            "Markers 269",
            "Markers 288",
            "Markers 333",
            "Markers 338",
            "Markers 345",
            "Markers 426",
            "Markers 457",
            "Markers 468",
            "Markers 472",
            "Markers 494",
            "Markers 540"
        });
    }

    [Fact]
    public void FindAllComponentStartingWith()
    {
        var countDial = 0;

        countDial.Should().Be(18);
    }

    [Fact]
    public void CountComponentByTypes()
    {
        Dictionary<ComponentType, int> types = null;

        types[ComponentType.Oscillator].Should().Be(25);
        types[ComponentType.BalanceWheel].Should().Be(18);
        types[ComponentType.Wheel].Should().Be(19);
    }

    [Fact]
    public void MostComplex()
    {
        Component mostComplexComponent = null;
        var componentsInsideBezel = 0;

        mostComplexComponent.Name.Should().Be("Bezel 1");
        componentsInsideBezel.Should().Be(38);
    }

    [Fact]
    public void AverageComponentsByType()
    {
        Dictionary<Component, int> averageSubcomponentsByType = null;
    }
}
