using System.Text.Json.Serialization;

namespace Workshop.Benchmark.Watch;

public class Component
{
    public string Name { get; set; }
    public string Id { get; set; }

    [JsonConverter(typeof(ComponentTypeConverter))]
    public ComponentType Type { get; set; }

    public List<Component> Components { get; set; } = [];
}