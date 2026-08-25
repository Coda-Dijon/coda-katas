using System;
using System.Collections.Generic;
using System.Linq;
using FluentAssertions;
using Xunit;
using LinqWorkshop.Tests.Queries.Data;
using static LinqWorkshop.Tests.Queries.Data.Persons;

namespace LinqWorkshop.Tests.Queries
{
    public class Part1
    {
        [Fact]
        public void GetFirstNamesOfAllPeopleWithMethodSyntax()
        {
            List<string> firstNames = [];

            firstNames.Should().BeEquivalentTo(
                (List<string>) ["Mary", "Bob", "Ted", "Jake", "Barry", "Terry", "Harry", "John"]
            );
        }

        [Fact]
        public void GetFirstNamesOfAllPeopleWithQuerySyntax()
        {
            List<string> firstNames = [];

            firstNames.Should().BeEquivalentTo(
                (List<string>) ["Mary", "Bob", "Ted", "Jake", "Barry", "Terry", "Harry", "John"]
            );
        }

        [Fact]
        public void GetNamesOfMarySmithsPets()
        {
            var person = GetPersonNamed("Mary Smith");

            var names = new List<string>();

            names.Single().Should().Be("Tabby");
        }

        [Fact]
        public void GetPeopleWithCats()
        {
            var peopleWithCats = new List<string>();

            peopleWithCats.Count.Should().Be(2);
        }

        [Fact]
        public void GetPeopleWithoutCats()
        {
            var peopleWithoutCats = new List<string>();

            peopleWithoutCats.Count.Should().Be(6);
        }

        [Fact]
        public void DoAnyPeopleHaveCats()
        {
            var doAnyPeopleHaveCats = false;

            doAnyPeopleHaveCats.Should().BeTrue();
        }

        [Fact]
        public void DoAllPeopleHavePets()
        {
            Predicate<Person> predicate = p => true;
            var result = People.TrueForAll(predicate);

            result.Should().BeFalse();
        }

        [Fact]
        public void HowManyPeopleHaveCats()
        {
            var count = 0;
            count.Should().Be(2);
        }

        [Fact]
        public void FindMarySmith()
        {
            Person result = null;

            result.FirstName.Should().Be("Mary");
            result.LastName.Should().Be("Smith");
        }

        [Fact]
        public void GetPeopleWithPets()
        {
            var petPeople = 0;

            petPeople.Should().Be(7);
        }
    }
}
