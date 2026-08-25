package linq_workshop.realworld.watch;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.List;

public class Component {
    public String name;
    public String id;

    @JsonDeserialize(using = ComponentTypeDeserializer.class)
    public ComponentType type;

    public List<Component> components = List.of();
}
