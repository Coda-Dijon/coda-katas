namespace ZombieFarm.Json;

// À implémenter, par réflexion (System.Reflection).
public class JsonSerializer
{
    public string Serialize(object obj) =>
        throw new NotImplementedException("Serialize n'est pas encore implémentée");

    // Astuce : commencez par JsonParser.Parse<Dictionary<string, object?>>(json) pour obtenir les champs du JSON.
    public T Deserialize<T>(string json) =>
        throw new NotImplementedException("Deserialize n'est pas encore implémentée");
}
