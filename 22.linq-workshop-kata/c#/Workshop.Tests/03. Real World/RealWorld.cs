using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using NUnit.Framework;
using Workshop.Tests._03._Real_World.Watch;
using static System.IO.File;
using static System.Text.Json.JsonSerializer;

namespace Workshop.Tests._03._Real_World;

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
        int totalCount = 0;
        Assert.AreEqual(564, totalCount);
    }

    [Test]
    public void Markers()
    {
        // Get all components of a specified type.
        // Markers here
        IEnumerable<Component> markers = null;

        Assert.AreEqual(14, markers.Count());
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
        var countDial = 0;
        Assert.AreEqual(18, countDial);
    }

    [Test]
    public void CountComponentByTypes()
    {
        // Group all components by their type.
        // Count the number of components for each type.
        Dictionary<ComponentType, int> types = null;

        Assert.AreEqual(25, types[ComponentType.Oscillator]);
        Assert.AreEqual(18, types[ComponentType.BalanceWheel]);
        Assert.AreEqual(19, types[ComponentType.Wheel]);
    }

    [Test]
    public void MostComplex()
    {
        // Identify component with the highest number of direct subcomponents.
        Component mostComplexComponent = null;
        var componentsInsideBezel = 0;

        Assert.AreEqual("Bezel 1", mostComplexComponent.Name);
        Assert.AreEqual(38, componentsInsideBezel);
    }

    [Test]
    public void AverageComponentsByType()
    {
        // Calculate the average number of subcomponents for each type of component.
        // Use an anonymous type with two properties: Type and AverageSubcomponents.
        Dictionary<Component, int> averageSubcomponentsByType = null;

        //Assert.AreEqual(1, averageSubcomponentsByType.Single(t => t.Type == ComponentType.Hand).AverageSubcomponents);
        //Assert.AreEqual(0.47,averageSubcomponentsByType.Single(t => t.Type == ComponentType.Wheel).AverageSubcomponents, 0.01);
        //Assert.AreEqual(0.719, averageSubcomponentsByType.Single(t => t.Type == ComponentType.Arbor).AverageSubcomponents, 0.01);
    }
}