package linq_workshop.realworld.watch;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;

public class ComponentTypeDeserializer extends JsonDeserializer<ComponentType> {

    @Override
    public ComponentType deserialize(JsonParser parser, DeserializationContext context) throws IOException {
        var value = parser.getText();
        return switch (value) {
            case "Balance Wheel" -> ComponentType.BalanceWheel;
            case "Shock Absorber" -> ComponentType.ShockAbsorber;
            case "Gear Train" -> ComponentType.GearTrain;
            default -> ComponentType.valueOf(value.replace(" ", ""));
        };
    }
}
