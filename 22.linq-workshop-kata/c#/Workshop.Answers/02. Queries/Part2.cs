using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using Workshop.Answers._02._Queries.Data;
using static Workshop.Answers._02._Queries.Data.Persons;

namespace Workshop.Answers._02._Queries;

public class Part2
{
    [Test]
    public void GetAllPetTypesOfAllPeople()
    {
        var petTypes = People
            .SelectMany(person => person.Pets.Select(pet => pet.Type))
            .Distinct();

        CollectionAssert.AreEquivalent(
            new List<PetType>
                {PetType.Cat, PetType.Dog, PetType.Snake, PetType.Bird, PetType.Turtle, PetType.Hamster}, petTypes);
    }

    [Test]
    public void TotalPetAge()
    {
        var totalAge = People
            .SelectMany(person => person.Pets)
            .Sum(pet => pet.Age);

        Assert.AreEqual(17L, totalAge);
    }

    [Test]
    public void PetsNameSorted()
    {
        var sortedPetNames = People
            .SelectMany(person => person.Pets)
            .OrderBy(pet => pet.Name)
            .Select(pet => pet.Name)
            .Aggregate((current, next) => $"{current}, {next}");

        Assert.AreEqual("Dolly, Fuzzy, Serpy, Speedy, Spike, Spot, Tabby, Tweety, Wuzzy", sortedPetNames);
    }

    [Test]
    public void SortByAge()
    {
        // Create a List<int> with ascending ordered age values.
        var sortedAgeList = People
            .SelectMany(person => person.Pets)
            .OrderBy(pet => pet.Age)
            .Select(pet => pet.Age)
            .Distinct()
            .ToList();

        Assert.AreEqual(4, sortedAgeList.Count);
        CollectionAssert.AreEquivalent(new List<int> {1, 2, 3, 4}, sortedAgeList);
    }

    [Test]
    public void SortByDescAge()
    {
        // Create a List<int> with descending ordered age values.
        // use ToList() to avoid multiple enumeration
        var sortedAgeList = People
            .SelectMany(person => person.Pets)
            .OrderByDescending(pet => pet.Age)
            .Select(pet => pet.Age)
            .Distinct()
            .ToList();

        Assert.AreEqual(4, sortedAgeList.Count);
        CollectionAssert.AreEquivalent(new List<int> {4, 3, 2, 1}, sortedAgeList);
    }

    [Test]
    public void Top3OlderPets()
    {
        // Create a List<string> with the 3 older pets.
        var top3OlderPets = People
            .SelectMany(person => person.Pets)
            .OrderByDescending(pet => pet.Age)
            .Take(3)
            .Select(pet => pet.Name)
            .ToList();

        Assert.AreEqual(3, top3OlderPets.Count);
        CollectionAssert.AreEquivalent(new List<string> {"Spike", "Dolly", "Tabby"}, top3OlderPets);
    }

    [Test]
    public void GetFirstPersonWithAtLeast2Pets()
    {
        // Find the first person who owns at least 2 pets
        var firstPersonWithAtLeast2Pets = People.Find(p => p.Pets.Count >= 2);

        Assert.AreEqual("Bob", firstPersonWithAtLeast2Pets.FirstName);
    }

    [Test]
    public void IsThereAnyPetOlderThan4()
    {
        // Check whether any pet older than 4 exists or not
        var isThereAnyPetOlderThan4 = People.SelectMany(p => p.Pets).Any(p => p.Age > 4);

        Assert.IsFalse(isThereAnyPetOlderThan4);
    }

    [Test]
    public void IsEveryPetsOlderThan1()
    {
        // Check whether all pets are older than 1 or not
        var allOlderThan1 = People.SelectMany(p => p.Pets).All(p => p.Age > 1);

        Assert.IsFalse(allOlderThan1);
    }

    [Test]
    public void GetListOfPossibleParksForAWalkPerPerson()
    {
        // For each person described as "firstName lastName" returns the list of names possible parks to go for a walk
        var possibleParksForAWalkPerPerson = People
            .ToDictionary(
                person => person.FirstName + " " + person.LastName,
                person => Parks
                    .Where(park => person
                        .Pets
                        .Select(pet => pet.Type)
                        .Distinct()
                        .ToList()
                        .TrueForAll(petType => park.AuthorizedPetTypes.Contains(petType))
                    )
                    .Select(park => park.Name)
                    .ToList()
            );

        CollectionAssert.AreEquivalent(
            new List<string> {"Jurassic", "Central", "Hippy"}, possibleParksForAWalkPerPerson["John Doe"]
        );
        CollectionAssert.AreEquivalent(
            new List<string> {"Jurassic", "Hippy"}, possibleParksForAWalkPerPerson["Jake Snake"]
        );
    }
}