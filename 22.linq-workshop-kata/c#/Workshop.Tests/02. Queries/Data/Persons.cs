using System;
using System.Collections.Generic;

namespace Workshop.Tests._02._Queries.Data
{
    public static class Persons
    {
        public static List<Person> People =
        [
            new Person("Mary", "Smith").AddPet(PetType.Cat, "Tabby", 2),
            new Person("Bob", "Smith")
                .AddPet(PetType.Cat, "Dolly", 3)
                .AddPet(PetType.Dog, "Spot", 2),

            new Person("Ted", "Smith").AddPet(PetType.Dog, "Spike", 4),
            new Person("Jake", "Snake").AddPet(PetType.Snake, "Serpy", 1),
            new Person("Barry", "Bird").AddPet(PetType.Bird, "Tweety", 2),
            new Person("Terry", "Turtle").AddPet(PetType.Turtle, "Speedy", 1),
            new Person("Harry", "Hamster")
                .AddPet(PetType.Hamster, "Fuzzy", 1)
                .AddPet(PetType.Hamster, "Wuzzy", 1),

            new Person("John", "Doe")
        ];

        public static List<Park> Parks =
        [
            new Park("Jurassic")
                .AddAuthorizedPetType(PetType.Bird)
                .AddAuthorizedPetType(PetType.Snake)
                .AddAuthorizedPetType(PetType.Turtle),

            new Park("Central")
                .AddAuthorizedPetType(PetType.Bird)
                .AddAuthorizedPetType(PetType.Cat)
                .AddAuthorizedPetType(PetType.Dog),

            new Park("Hippy")
                .AddAuthorizedPetType(PetType.Bird)
                .AddAuthorizedPetType(PetType.Cat)
                .AddAuthorizedPetType(PetType.Dog)
                .AddAuthorizedPetType(PetType.Turtle)
                .AddAuthorizedPetType(PetType.Hamster)
                .AddAuthorizedPetType(PetType.Snake)
        ];

        public static Person GetPersonNamed(string fullName)
            => People.Find(p => p.Named(fullName)) ??
               throw new ArgumentException("Can't find person named: " + fullName);
    }
}