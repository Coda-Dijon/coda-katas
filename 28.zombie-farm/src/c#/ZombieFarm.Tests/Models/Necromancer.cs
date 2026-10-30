using ZombieFarm.Json;

namespace ZombieFarm.Tests.Models;

public class Necromancer
{
    public string Name { get; set; } = "";
    [JsonName("dark_title")] public string Title { get; set; } = "";
    public int YearsOfService { get; set; }
}
