package linq_workshop.queries.data;

import java.util.List;
import java.util.NoSuchElementException;

public final class Persons {

    private Persons() {
    }

    public static final List<Person> PEOPLE = List.of(
        new Person("Mary", "Smith").addPet(PetType.Cat, "Tabby", 2),
        new Person("Bob", "Smith")
            .addPet(PetType.Cat, "Dolly", 3)
            .addPet(PetType.Dog, "Spot", 2),

        new Person("Ted", "Smith").addPet(PetType.Dog, "Spike", 4),
        new Person("Jake", "Snake").addPet(PetType.Snake, "Serpy", 1),
        new Person("Barry", "Bird").addPet(PetType.Bird, "Tweety", 2),
        new Person("Terry", "Turtle").addPet(PetType.Turtle, "Speedy", 1),
        new Person("Harry", "Hamster")
            .addPet(PetType.Hamster, "Fuzzy", 1)
            .addPet(PetType.Hamster, "Wuzzy", 1),

        new Person("John", "Doe")
    );

    public static final List<Park> PARKS = List.of(
        new Park("Jurassic")
            .addAuthorizedPetType(PetType.Bird)
            .addAuthorizedPetType(PetType.Snake)
            .addAuthorizedPetType(PetType.Turtle),

        new Park("Central")
            .addAuthorizedPetType(PetType.Bird)
            .addAuthorizedPetType(PetType.Cat)
            .addAuthorizedPetType(PetType.Dog),

        new Park("Hippy")
            .addAuthorizedPetType(PetType.Bird)
            .addAuthorizedPetType(PetType.Cat)
            .addAuthorizedPetType(PetType.Dog)
            .addAuthorizedPetType(PetType.Turtle)
            .addAuthorizedPetType(PetType.Hamster)
            .addAuthorizedPetType(PetType.Snake)
    );

    public static Person getPersonNamed(String fullName) {
        return PEOPLE.stream()
            .filter(p -> p.named(fullName))
            .findFirst()
            .orElseThrow(() -> new NoSuchElementException("Can't find person named: " + fullName));
    }
}
