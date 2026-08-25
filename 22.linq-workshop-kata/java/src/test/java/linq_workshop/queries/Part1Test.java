package linq_workshop.queries;

import linq_workshop.queries.data.Person;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import static linq_workshop.queries.data.Persons.PEOPLE;
import static linq_workshop.queries.data.Persons.getPersonNamed;
import static org.assertj.core.api.Assertions.assertThat;

class Part1Test {

    @Test
    void getFirstNamesOfAllPeople() {
        List<String> firstNames = new ArrayList<>();

        assertThat(firstNames).containsExactlyInAnyOrder(
            "Mary", "Bob", "Ted", "Jake", "Barry", "Terry", "Harry", "John"
        );
    }

    @Test
    void getNamesOfMarySmithsPets() {
        var person = getPersonNamed("Mary Smith");

        List<String> names = new ArrayList<>();

        assertThat(names).containsExactly("Tabby");
    }

    @Test
    void getPeopleWithCats() {
        List<String> peopleWithCats = new ArrayList<>();

        assertThat(peopleWithCats).hasSize(2);
    }

    @Test
    void getPeopleWithoutCats() {
        List<String> peopleWithoutCats = new ArrayList<>();

        assertThat(peopleWithoutCats).hasSize(6);
    }

    @Test
    void doAnyPeopleHaveCats() {
        boolean doAnyPeopleHaveCats = false;

        assertThat(doAnyPeopleHaveCats).isTrue();
    }

    @Test
    void doAllPeopleHavePets() {
        Predicate<Person> predicate = p -> true;
        boolean result = PEOPLE.stream().allMatch(predicate);

        assertThat(result).isFalse();
    }

    @Test
    void howManyPeopleHaveCats() {
        long count = 0;

        assertThat(count).isEqualTo(2);
    }

    @Test
    void findMarySmith() {
        Person result = null;

        assertThat(result.firstName()).isEqualTo("Mary");
        assertThat(result.lastName()).isEqualTo("Smith");
    }

    @Test
    void getPeopleWithPets() {
        long petPeople = 0;

        assertThat(petPeople).isEqualTo(7);
    }
}
