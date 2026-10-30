using ZombieFarm.Json;

namespace ZombieFarm.Tests.Models;

public class Zombie
{
    // Convention collective des morts-vivants
    public static int MaxHoursPerDay { get; } = 24;

    [JsonName("zombie_name")] public string Name { get; set; } = "";
    public int HoursWorkedToday { get; set; }
    public double BrainsPerHour { get; set; }
    public bool Unionized { get; set; }
    public Necromancer? Supervisor { get; set; }
    public List<BodyPart> MissingBodyParts { get; set; } = [];
    public List<string> Skills { get; set; } = [];

    // RGPD des morts-vivants : l'identité humaine ne doit jamais sortir de l'élevage
    [JsonIgnore] public string HumanIdentity { get; set; } = "";
}
