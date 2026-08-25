package linq_workshop.queries;

import linq_workshop.queries.data.Person;
import linq_workshop.queries.data.PetType;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

class Part2Test {

    @Test
    void getAllPetTypesOfAllPeople() {
        List<PetType> petTypes = new ArrayList<>();

        assertThat(petTypes).containsExactlyInAnyOrder(
            PetType.Cat, PetType.Dog, PetType.Snake, PetType.Bird, PetType.Turtle, PetType.Hamster
        );
    }

    @Test
    void totalPetAge() {
        long totalAge = 0L;

        assertThat(totalAge).isEqualTo(17L);
    }

    @Test
    void petsNameSorted() {
        String sortedPetNames = null;

        assertThat(sortedPetNames).isEqualTo("Dolly, Fuzzy, Serpy, Speedy, Spike, Spot, Tabby, Tweety, Wuzzy");
    }

    @Test
    void sortByAge() {
        List<Integer> sortedAgeList = new ArrayList<>();

        assertThat(sortedAgeList).hasSize(4);
        assertThat(sortedAgeList).containsExactlyInAnyOrder(1, 2, 3, 4);
    }

    @Test
    void sortByDescAge() {
        List<Integer> sortedAgeList = new ArrayList<>();

        assertThat(sortedAgeList).hasSize(4);
        assertThat(sortedAgeList).containsExactlyInAnyOrder(4, 3, 2, 1);
    }

    @Test
    void top3OlderPets() {
        List<String> top3OlderPets = new ArrayList<>();

        assertThat(top3OlderPets).hasSize(3);
        assertThat(top3OlderPets).containsExactlyInAnyOrder("Spike", "Dolly", "Tabby");
    }

    @Test
    void getFirstPersonWithAtLeast2Pets() {
        Person firstPersonWithAtLeast2Pets = null;

        assertThat(firstPersonWithAtLeast2Pets.firstName()).isEqualTo("Bob");
    }

    @Test
    void isThereAnyPetOlderThan4() {
        boolean isThereAnyPetOlderThan4 = true;

        assertThat(isThereAnyPetOlderThan4).isFalse();
    }

    @Test
    void isEveryPetsOlderThan1() {
        boolean allOlderThan1 = false;

        assertThat(allOlderThan1).isFalse();
    }

    @Test
    void getListOfPossibleParksForAWalkPerPerson() {
        Map<String, List<String>> possibleParksForAWalkPerPerson = Map.of();

        assertThat(possibleParksForAWalkPerPerson.get("John Doe"))
            .containsExactlyInAnyOrder("Jurassic", "Central", "Hippy");
        assertThat(possibleParksForAWalkPerPerson.get("Jake Snake"))
            .containsExactlyInAnyOrder("Jurassic", "Hippy");
    }
}
