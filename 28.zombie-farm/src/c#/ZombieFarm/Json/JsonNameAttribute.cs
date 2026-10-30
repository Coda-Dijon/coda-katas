namespace ZombieFarm.Json;

// Fourni : la clé JSON à utiliser à la place du nom de la propriété.
[AttributeUsage(AttributeTargets.Property)]
public sealed class JsonNameAttribute(string name) : Attribute
{
    public string Name { get; } = name;
}
