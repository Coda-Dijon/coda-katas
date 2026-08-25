using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace Workshop.Tests._02._Queries.Data
{
    public class Person
    {
        public string FirstName { get; }
        public string LastName { get; }
        public ReadOnlyCollection<Pet> Pets { get; }

        public Person(string firstName, string lastName)
            : this(firstName, lastName, [])
        {
        }

        public Person(string firstName, string lastName, List<Pet> pets)
        {
            FirstName = firstName;
            LastName = lastName;
            Pets = new ReadOnlyCollection<Pet>(pets);
        }

        public bool Named(string fullName) => fullName.Equals(FirstName + " " + LastName);

        public Dictionary<PetType, int> GetPetTypes() =>
            Pets.GroupBy(p => p.Type)
                .ToDictionary(g => g.Key, g => g.Count());

        public bool HasPetType(PetType type) =>
            GetPetTypes()
                .ContainsKey(type);

        public Person AddPet(PetType petType, string name, int age)
        {
            var newPets = Pets.ToList();
            newPets.Add(new Pet(petType, name, age));
            return new Person(FirstName, LastName, newPets);
        }

        public bool IsPetPerson() => GetNumberOfPets >= 1;

        public int GetNumberOfPets => Pets.Count;
    }
}