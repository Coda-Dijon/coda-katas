using System;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using Workshop.Tests._02._Queries.Data;
using static Workshop.Tests._02._Queries.Data.Persons;

namespace Workshop.Tests._02._Queries
{
    // LinQ history and syntax: https://www.bytehide.com/blog/linq-csharp#LinQ_C_Foundations_Building_Blocks_for_Success
    public class Part1
    {
        [Test]
        public void GetFirstNamesOfAllPeopleWithMethodSyntax()
        {
            // Replace it, with a transformation method on people.
            List<string> firstNames = [];

            CollectionAssert.AreEquivalent(
                (List<string>) ["Mary", "Bob", "Ted", "Jake", "Barry", "Terry", "Harry", "John"],
                firstNames
            );
        }

        [Test]
        public void GetFirstNamesOfAllPeopleWithQuerySyntax()
        {
            // Replace it, with a transformation method on people.
            List<string> firstNames = [];

            CollectionAssert.AreEquivalent(
                (List<string>) ["Mary", "Bob", "Ted", "Jake", "Barry", "Terry", "Harry", "John"],
                firstNames
            );
        }

        [Test]
        public void GetNamesOfMarySmithsPets()
        {
            var person = GetPersonNamed("Mary Smith");

            // Replace it, with a transformation method on people.
            var names = new List<string>();

            Assert.AreEqual("Tabby", names.Single());
        }

        [Test]
        public void GetPeopleWithCats()
        {
            // Replace it, with a positive filtering method on people.
            var peopleWithCats = new List<string>();

            Assert.AreEqual(2, peopleWithCats.Count);
        }

        [Test]
        public void GetPeopleWithoutCats()
        {
            // Replace it, with a negative filtering method on List.
            var peopleWithoutCats = new List<string>();

            Assert.AreEqual(6, peopleWithoutCats.Count);
        }

        [Test]
        public void DoAnyPeopleHaveCats()
        {
            //replace null with a Predicate lambda which checks for PetType.CAT
            var doAnyPeopleHaveCats = false;

            Assert.IsTrue(doAnyPeopleHaveCats);
        }

        [Test]
        public void DoAllPeopleHavePets()
        {
            Predicate<Person> predicate = p => true;
            // replace with a method call send to people that checks if all people have pets
            var result = People.TrueForAll(predicate);

            Assert.IsFalse(result);
        }

        [Test]
        public void HowManyPeopleHaveCats()
        {
            // replace 0 with the correct answer
            var count = 0;
            Assert.AreEqual(2, count);
        }

        [Test]
        public void FindMarySmith()
        {
            Person result = null;

            Assert.AreEqual("Mary", result.FirstName);
            Assert.AreEqual("Smith", result.LastName);
        }

        [Test]
        public void GetPeopleWithPets()
        {
            // replace with only the pets owners
            var petPeople = 0;

            Assert.AreEqual(7, petPeople);
        }
    }
}