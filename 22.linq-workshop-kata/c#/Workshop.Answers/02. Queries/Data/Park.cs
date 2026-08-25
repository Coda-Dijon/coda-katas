using System.Linq;

namespace Workshop.Answers._02._Queries.Data
{
    public class Park
    {
        public string Name { get; }
        public PetType[] AuthorizedPetTypes { get; }

        public Park(string name)
            : this(name, [])
        {
        }

        public Park(string name, PetType[] authorizedPetTypes)
        {
            Name = name;
            AuthorizedPetTypes = authorizedPetTypes;
        }

        public Park AddAuthorizedPetType(PetType petType) => new(Name, AuthorizedPetTypes.Append(petType).ToArray());
    }
}