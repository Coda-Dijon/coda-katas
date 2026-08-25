package linq_workshop.queries.data;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public final class Person {
    private final String firstName;
    private final String lastName;
    private final List<Pet> pets;

    public Person(String firstName, String lastName) {
        this(firstName, lastName, List.of());
    }

    public Person(String firstName, String lastName, List<Pet> pets) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.pets = Collections.unmodifiableList(new ArrayList<>(pets));
    }

    public String firstName() {
        return firstName;
    }

    public String lastName() {
        return lastName;
    }

    public List<Pet> pets() {
        return pets;
    }

    public boolean named(String fullName) {
        return fullName.equals(firstName + " " + lastName);
    }

    public Map<PetType, Long> petTypes() {
        return pets.stream()
            .collect(Collectors.groupingBy(Pet::type, Collectors.counting()));
    }

    public boolean hasPetType(PetType type) {
        return petTypes().containsKey(type);
    }

    public Person addPet(PetType type, String name, int age) {
        var newPets = new ArrayList<>(pets);
        newPets.add(new Pet(type, name, age));
        return new Person(firstName, lastName, newPets);
    }

    public boolean isPetPerson() {
        return numberOfPets() >= 1;
    }

    public int numberOfPets() {
        return pets.size();
    }
}
