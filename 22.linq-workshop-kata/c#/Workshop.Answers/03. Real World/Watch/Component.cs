using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Workshop.Answers._03._Real_World.Watch;

public class Component
{
    public string Name { get; set; }
    public string Id { get; set; }

    [JsonConverter(typeof(ComponentTypeConverter))]
    public ComponentType Type { get; set; }

    public List<Component> Components { get; set; } = [];
}