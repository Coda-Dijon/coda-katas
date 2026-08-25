package linq_workshop.queries.data;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public final class Park {
    private final String name;
    private final List<PetType> authorizedPetTypes;

    public Park(String name) {
        this(name, List.of());
    }

    public Park(String name, List<PetType> authorizedPetTypes) {
        this.name = name;
        this.authorizedPetTypes = Collections.unmodifiableList(new ArrayList<>(authorizedPetTypes));
    }

    public String name() {
        return name;
    }

    public List<PetType> authorizedPetTypes() {
        return authorizedPetTypes;
    }

    public Park addAuthorizedPetType(PetType petType) {
        var newTypes = new ArrayList<>(authorizedPetTypes);
        newTypes.add(petType);
        return new Park(name, newTypes);
    }
}
