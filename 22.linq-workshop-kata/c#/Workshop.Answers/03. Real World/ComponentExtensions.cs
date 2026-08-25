using System.Collections.Generic;
using System.Linq;
using Workshop.Answers._03._Real_World.Watch;

namespace Workshop.Answers._03._Real_World;

public static class ComponentExtensions
{
    public static IEnumerable<Component> GetAllComponents(this Component root)
        => root.Components
            .Concat(root.Components.SelectMany(child => child.GetAllComponents()));

    public static IEnumerable<Component> GetAllComponentsOfType(this Component root, ComponentType type)
        => root.GetAllComponents()
            .Where(component => component.Type == type);

    public static IEnumerable<Component> FindAllComponentStartingWith(this Component root, string start)
        => root.GetAllComponents()
            .Where(component => component.Name.StartsWith(start));

    public static Dictionary<ComponentType, List<Component>> GroupByType(this Component root)
        => root.GetAllComponents()
            .GroupBy(component => component.Type)
            .ToDictionary(g => g.Key, g => g.ToList());

    public static Component MostComplexComponent(this Component root)
        => root.GetAllComponents()
            .OrderByDescending(c => c.Components.Count)
            .FirstOrDefault();
}