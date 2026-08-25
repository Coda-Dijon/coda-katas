using System;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using Workshop.Answers._02._Queries.Data;
using static Workshop.Answers._02._Queries.Data.Persons;

namespace Workshop.Answers._02._Queries
{
    public class Part1
    {
        [Test]
        public void GetFirstNamesOfAllPeopleWithMethodSyntax()
        {
            // Replace it, with a transformation method on people.
            var firstNames = People
                .Select(p => p.FirstName);

            CollectionAssert.AreEquivalent(
                (List<string>) ["Mary", "Bob", "Ted", "Jake", "Barry", "Terry", "Harry", "John"],
                firstNames
            );
        }

        [Test]
        public void GetFirstNamesOfAllPeopleWithQuerySyntax()
        {
            // Replace it, with a transformation method on people.
            var firstNames =
                from p in People
                select p.FirstName;

            CollectionAssert.AreEquivalent(
                (List<string>) ["Mary", "Bob", "Ted", "Jake", "Barry", "Terry", "Harry", "John"],
                firstNames
            );
        }

        [Test]
        public void GetNamesOfMarySmithsPets()
        {
            var person = GetPersonNamed("Mary Smith");
            var names = person.Pets.Select(p => p.Name);

            Assert.AreEqual("Tabby", names.Single());
        }

        [Test]
        public void GetPeopleWithCats()
        {
            // Replace it, with a positive filtering method on people.
            var peopleWithCats =
                People
                    .Where(p => p.Pets.Any(pet => pet.Type == PetType.Cat))
                    .Select(p => p.FirstName);

            /*
             * from p in People
               where p.Pets.Any(pet => pet.Type == PetType.Cat)
               select p.FirstName;
             */

            Assert.AreEqual(2, peopleWithCats.Count());
        }

        [Test]
        public void GetPeopleWithoutCats()
        {
            // Replace it, with a negative filtering method on List.
            var peopleWithoutCats = People
                .Where(p => p.Pets.All(pet => pet.Type != PetType.Cat))
                .Select(p => p.FirstName);

            Assert.AreEqual(6, peopleWithoutCats.Count());
        }

        [Test]
        public void DoAnyPeopleHaveCats()
        {
            //replace null with a Predicate lambda which checks for PetType.CAT
            var doAnyPeopleHaveCats = People.Any(p => p.Pets.Any(pet => pet.Type == PetType.Cat));

            Assert.IsTrue(doAnyPeopleHaveCats);
        }

        [Test]
        public void DoAllPeopleHavePets()
        {
            Predicate<Person> predicate = p => p.Pets.Any();
            // replace with a method call send to this.people that checks if all people have pets
            var result = People.TrueForAll(predicate);

            Assert.IsFalse(result);
        }

        [Test]
        public void HowManyPeopleHaveCats()
        {
            // replace 0 with the correct answer
            var count = People.Count(p => p.Pets.Any(pet => pet.Type == PetType.Cat));
            Assert.AreEqual(2, count);
        }

        [Test]
        public void FindMarySmith()
        {
            // Throws an exception if no match is found
            // Favor find or SingleOrDefault over Single
            var result = People.Single(p => p.FirstName == "Mary" && p.LastName == "Smith");

            Assert.AreEqual("Mary", result.FirstName);
            Assert.AreEqual("Smith", result.LastName);
        }

        [Test]
        public void GetPeopleWithPets()
        {
            // replace with only the pets owners
            var petPeople = People.Count(p => p.Pets.Any());

            Assert.AreEqual(7, petPeople);
        }
    }
}