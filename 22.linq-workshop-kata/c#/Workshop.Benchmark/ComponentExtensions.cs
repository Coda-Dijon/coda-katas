using Workshop.Benchmark.Watch;

namespace Workshop.Benchmark;

public static class ComponentExtensions
{
    public static IEnumerable<Component> GetAllComponentsWithLinQ(this Component root)
        => root.Components
            .Concat(root.Components.SelectMany(child => child.GetAllComponentsWithLinQ()));

    public static IEnumerable<Component> GetAllComponents(this Component root)
    {
        var components = new List<Component>();
        var stack = new Stack<Component>();
        stack.Push(root);

        while (stack.Count > 0)
        {
            var current = stack.Pop();
            components.Add(current);

            foreach (var child in current.Components)
            {
                stack.Push(child);
            }
        }

        return components;
    }

    public static IEnumerable<Component> GetAllComponentsOptimized(this Component root)
    {
        var stack = new Stack<Component>();
        stack.Push(root);

        while (stack.Count > 0)
        {
            var current = stack.Pop();
            yield return current;

            foreach (var child in current.Components)
            {
                stack.Push(child);
            }
        }
    }

    public static Dictionary<ComponentType, List<Component>> GroupByTypeWithLinQ(this Component root)
        => root.GetAllComponentsWithLinQ()
            .GroupBy(component => component.Type)
            .ToDictionary(g => g.Key, g => g.ToList());

    public static Dictionary<ComponentType, List<Component>> GroupByType(this Component root)
    {
        var componentsByType = new Dictionary<ComponentType, List<Component>>();
        var stack = new Stack<Component>();
        stack.Push(root);

        while (stack.Count > 0)
        {
            var current = stack.Pop();

            if (!componentsByType.ContainsKey(current.Type))
            {
                componentsByType[current.Type] = new List<Component>();
            }

            componentsByType[current.Type].Add(current);

            foreach (var child in current.Components)
            {
                stack.Push(child);
            }
        }

        return componentsByType;
    }
}