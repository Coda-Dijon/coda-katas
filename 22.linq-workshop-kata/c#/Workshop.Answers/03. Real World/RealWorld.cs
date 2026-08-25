using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using NUnit.Framework;
using Workshop.Answers._03._Real_World.Watch;
using static System.IO.File;
using static System.Text.Json.JsonSerializer;

namespace Workshop.Answers._03._Real_World;

public class RealWorld
{
    private Component _watch;

    [OneTimeSetUp]
    public void GlobalSetup() => _watch = DeserializeWatch();

    private static Component DeserializeWatch()
        => Deserialize<Component>(
            ReadAllText("03. Real World/watch.json"),
            new JsonSerializerOptions {PropertyNameCaseInsensitive = true}
        );

    [Test]
    public void AllComponents()
    {
        // Count all components in the structure, including nested ones.
        Assert.AreEqual(564, _watch.GetAllComponents().Count());
    }

    [Test]
    public void Markers()
    {
        // Get all components of a specified type.
        // Markers here
        var markers = _watch.GetAllComponentsOfType(ComponentType.Markers).ToList();
        Assert.AreEqual(14, markers.Count);
        CollectionAssert.AreEquivalent(
            new List<string>
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
            },
            markers.Select(m => m.Name)
        );
    }

    [Test]
    public void FindAllComponentStartingWith()
    {
        // Retrieve components whose names match a specific pattern (e.g., starts with "Dial" or "Screw").
        Assert.AreEqual(18, _watch.FindAllComponentStartingWith("Dial").Count());
    }

    [Test]
    public void CountComponentByTypes()
    {
        // Group all components by their type.
        // Count the number of components for each type.
        var types = _watch.GroupByType()
            .ToDictionary(g => g.Key, g => g.Value.Count);

        Assert.AreEqual(25, types[ComponentType.Oscillator]);
        Assert.AreEqual(18, types[ComponentType.BalanceWheel]);
        Assert.AreEqual(19, types[ComponentType.Wheel]);
    }

    [Test]
    public void MostComplex()
    {
        // Identify component with the highest number of direct subcomponents.
        var mostComplexComponent = _watch.MostComplexComponent();

        Assert.AreEqual("Bezel 1", mostComplexComponent.Name);
        Assert.AreEqual(38, mostComplexComponent.GetAllComponents().Count());
    }

    [Test]
    public void AverageComponentsByType()
    {
        // Calculate the average number of subcomponents for each type of component.
        var averageSubcomponentsByType = _watch
            .GetAllComponents()
            .GroupBy(c => c.Type)
            .Select(g => new
            {
                Type = g.Key,
                AverageSubcomponents = g.Average(c => c.Components.Count)
            }).ToList();

        Assert.AreEqual(1, averageSubcomponentsByType.Single(t => t.Type == ComponentType.Hand).AverageSubcomponents);
        Assert.AreEqual(0.47,
            averageSubcomponentsByType.Single(t => t.Type == ComponentType.Wheel).AverageSubcomponents, 0.01);
        Assert.AreEqual(0.719,
            averageSubcomponentsByType.Single(t => t.Type == ComponentType.Arbor).AverageSubcomponents, 0.01);
    }
}