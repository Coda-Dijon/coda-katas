namespace ZombieFarm.Json;

// Fourni : une propriété marquée n'est jamais écrite dans le JSON, ni lue depuis le JSON.
[AttributeUsage(AttributeTargets.Property)]
public sealed class JsonIgnoreAttribute : Attribute;
