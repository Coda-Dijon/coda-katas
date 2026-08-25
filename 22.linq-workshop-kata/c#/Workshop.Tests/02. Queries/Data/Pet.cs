namespace Workshop.Tests._02._Queries.Data
{
    public readonly struct Pet(PetType type, string name, int age)
    {
        public PetType Type { get; } = type;
        public string Name { get; } = name;
        public int Age { get; } = age;
    }
}