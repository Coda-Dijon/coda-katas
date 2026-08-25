using System.Text.Json;
using System.Text.Json.Serialization;

namespace Workshop.Benchmark.Watch;

public class ComponentTypeConverter : JsonConverter<ComponentType>
{
    public override ComponentType Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var value = reader.GetString() ?? throw new JsonException("ComponentType value is null");
        return value switch
        {
            "Balance Wheel" => ComponentType.BalanceWheel,
            "Shock Absorber" => ComponentType.ShockAbsorber,
            "Gear Train" => ComponentType.GearTrain,
            _ => (ComponentType) Enum.Parse(typeof(ComponentType), value.Replace(" ", ""))
        };
    }

    public override void Write(Utf8JsonWriter writer, ComponentType value, JsonSerializerOptions options)
        => writer.WriteStringValue(value switch
        {
            ComponentType.BalanceWheel => "Balance Wheel",
            ComponentType.ShockAbsorber => "Shock Absorber",
            ComponentType.GearTrain => "Gear Train",
            _ => value.ToString()
        });
}