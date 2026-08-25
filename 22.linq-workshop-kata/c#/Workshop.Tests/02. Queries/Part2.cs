using System.Collections.Generic;
using NUnit.Framework;
using Workshop.Tests._02._Queries.Data;

namespace Workshop.Tests._02._Queries;

public class Part2
{
    [Test]
    public void GetAllPetTypesOfAllPeople()
    {
        var petTypes = new List<PetType>();

        CollectionAssert.AreEquivalent(
            new List<PetType>
                {PetType.Cat, PetType.Dog, PetType.Snake, PetType.Bird, PetType.Turtle, PetType.Hamster}, petTypes);
    }

    [Test]
    public void TotalPetAge()
    {
        var totalAge = 0L;
        Assert.AreEqual(17L, totalAge);
    }

    [Test]
    public void PetsNameSorted()
    {
        string sortedPetNames = null;

        Assert.AreEqual("Dolly, Fuzzy, Serpy, Speedy, Spike, Spot, Tabby, Tweety, Wuzzy", sortedPetNames);
    }

    [Test]
    public void SortByAge()
    {
        // Create a List<int> with ascending ordered age values.
        var sortedAgeList = new List<int>();

        Assert.AreEqual(4, sortedAgeList.Count);
        CollectionAssert.AreEquivalent(new List<int> {1, 2, 3, 4}, sortedAgeList);
    }

    [Test]
    public void SortByDescAge()
    {
        // Create a List<int> with descending ordered age values.
        var sortedAgeList = new List<int>();

        Assert.AreEqual(4, sortedAgeList.Count);
        CollectionAssert.AreEquivalent(new List<int> {4, 3, 2, 1}, sortedAgeList);
    }

    [Test]
    public void Top3OlderPets()
    {
        // Create a List<string> with the 3 older pets.
        var top3OlderPets = new List<string>();

        Assert.AreEqual(3, top3OlderPets.Count);
        CollectionAssert.AreEquivalent(new List<string> {"Spike", "Dolly", "Tabby"}, top3OlderPets);
    }

    [Test]
    public void GetFirstPersonWithAtLeast2Pets()
    {
        // Find the first person who owns at least 2 pets
        Person firstPersonWithAtLeast2Pets = null;

        Assert.AreEqual("Bob", firstPersonWithAtLeast2Pets.FirstName);
    }

    [Test]
    public void IsThereAnyPetOlderThan4()
    {
        // Check whether any pet older than 4 exists or not
        var isThereAnyPetOlderThan4 = true;

        Assert.IsFalse(isThereAnyPetOlderThan4);
    }

    [Test]
    public void IsEveryPetsOlderThan1()
    {
        // Check whether all pets are older than 1 or not
        var allOlderThan1 = false;

        Assert.IsFalse(allOlderThan1);
    }

    [Test]
    public void GetListOfPossibleParksForAWalkPerPerson()
    {
        // For each person described as "firstName lastName" returns the list of names possible parks to go for a walk
        var possibleParksForAWalkPerPerson = new Dictionary<string, List<string>>();

        CollectionAssert.AreEquivalent(
            new List<string> {"Jurassic", "Central", "Hippy"}, possibleParksForAWalkPerPerson["John Doe"]
        );
        CollectionAssert.AreEquivalent(
            new List<string> {"Jurassic", "Hippy"}, possibleParksForAWalkPerPerson["Jake Snake"]
        );
    }
}