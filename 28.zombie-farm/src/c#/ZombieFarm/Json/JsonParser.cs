using System.Text.Json;

namespace ZombieFarm.Json;

// Fourni : transforme un texte JSON en arbre de valeurs .NET.
//   objet   -> Dictionary<string, object?> (les clés gardent leur ordre)
//   tableau -> List<object?>
//   chaîne  -> string
//   nombre  -> long s'il est entier, double sinon
//   true / false -> bool
//   null    -> null
// L'appelant choisit le type attendu pour la racine, par exemple :
//   JsonParser.Parse<Dictionary<string, object?>>("""{"zombie_name":"Gérard"}""")
// Les valeurs à l'intérieur de l'arbre restent des object? : à vous de tester leur type.
public static class JsonParser
{
    public static T Parse<T>(string json)
    {
        object? tree;
        try
        {
            using var document = JsonDocument.Parse(json);
            tree = ToTree(document.RootElement);
        }
        catch (System.Text.Json.JsonException e)
        {
            throw new JsonMappingException($"JSON invalide : {e.Message}", e);
        }

        return tree is T root
            ? root
            : throw new JsonMappingException(
                $"La racine du JSON est {Describe(tree)}, impossible de la lire comme {DisplayName(typeof(T))}");
    }

    private static string Describe(object? tree) => tree switch
    {
        Dictionary<string, object?> => "un objet",
        List<object?> => "un tableau",
        string => "une chaîne",
        long or double => "un nombre",
        bool => "un booléen",
        _ => "null"
    };

    private static string DisplayName(Type type) => type.IsGenericType
        ? $"{type.Name[..type.Name.IndexOf('`')]}<{string.Join(", ", type.GetGenericArguments().Select(DisplayName))}>"
        : type.Name;

    private static object? ToTree(JsonElement element) => element.ValueKind switch
    {
        JsonValueKind.Object => element.EnumerateObject()
            .Aggregate(new Dictionary<string, object?>(), (tree, property) =>
            {
                tree[property.Name] = ToTree(property.Value);
                return tree;
            }),
        JsonValueKind.Array => element.EnumerateArray().Select(ToTree).ToList(),
        JsonValueKind.String => element.GetString(),
        JsonValueKind.Number => element.TryGetInt64(out var integer) ? integer : element.GetDouble(),
        JsonValueKind.True => true,
        JsonValueKind.False => false,
        _ => null
    };
}
