using System.Collections.Generic;
using FluentAssertions;
using Xunit;
using LinqWorkshop.Tests.Queries.Data;

namespace LinqWorkshop.Tests.Queries;

public class Part2
{
    [Fact]
    public void GetAllPetTypesOfAllPeople()
    {
        var petTypes = new List<PetType>();

        petTypes.Should().BeEquivalentTo(
            new List<PetType>
                {PetType.Cat, PetType.Dog, PetType.Snake, PetType.Bird, PetType.Turtle, PetType.Hamster});
    }

    [Fact]
    public void TotalPetAge()
    {
        var totalAge = 0L;
        totalAge.Should().Be(17L);
    }

    [Fact]
    public void PetsNameSorted()
    {
        string sortedPetNames = null;

        sortedPetNames.Should().Be("Dolly, Fuzzy, Serpy, Speedy, Spike, Spot, Tabby, Tweety, Wuzzy");
    }

    [Fact]
    public void SortByAge()
    {
        var sortedAgeList = new List<int>();

        sortedAgeList.Count.Should().Be(4);
        sortedAgeList.Should().BeEquivalentTo(new List<int> {1, 2, 3, 4});
    }

    [Fact]
    public void SortByDescAge()
    {
        var sortedAgeList = new List<int>();

        sortedAgeList.Count.Should().Be(4);
        sortedAgeList.Should().BeEquivalentTo(new List<int> {4, 3, 2, 1});
    }

    [Fact]
    public void Top3OlderPets()
    {
        var top3OlderPets = new List<string>();

        top3OlderPets.Count.Should().Be(3);
        top3OlderPets.Should().BeEquivalentTo(new List<string> {"Spike", "Dolly", "Tabby"});
    }

    [Fact]
    public void GetFirstPersonWithAtLeast2Pets()
    {
        Person firstPersonWithAtLeast2Pets = null;

        firstPersonWithAtLeast2Pets.FirstName.Should().Be("Bob");
    }

    [Fact]
    public void IsThereAnyPetOlderThan4()
    {
        var isThereAnyPetOlderThan4 = true;

        isThereAnyPetOlderThan4.Should().BeFalse();
    }

    [Fact]
    public void IsEveryPetsOlderThan1()
    {
        var allOlderThan1 = false;

        allOlderThan1.Should().BeFalse();
    }

    [Fact]
    public void GetListOfPossibleParksForAWalkPerPerson()
    {
        var possibleParksForAWalkPerPerson = new Dictionary<string, List<string>>();

        possibleParksForAWalkPerPerson["John Doe"].Should().BeEquivalentTo(
            new List<string> {"Jurassic", "Central", "Hippy"}
        );
        possibleParksForAWalkPerPerson["Jake Snake"].Should().BeEquivalentTo(
            new List<string> {"Jurassic", "Hippy"}
        );
    }
}
