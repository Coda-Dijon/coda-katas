import { Person } from "./person";
import { Park } from "./park";
import { PetType } from "./pet-type";

export const people: Person[] = [
  new Person("Mary", "Smith").addPet(PetType.Cat, "Tabby", 2),
  new Person("Bob", "Smith")
    .addPet(PetType.Cat, "Dolly", 3)
    .addPet(PetType.Dog, "Spot", 2),

  new Person("Ted", "Smith").addPet(PetType.Dog, "Spike", 4),
  new Person("Jake", "Snake").addPet(PetType.Snake, "Serpy", 1),
  new Person("Barry", "Bird").addPet(PetType.Bird, "Tweety", 2),
  new Person("Terry", "Turtle").addPet(PetType.Turtle, "Speedy", 1),
  new Person("Harry", "Hamster")
    .addPet(PetType.Hamster, "Fuzzy", 1)
    .addPet(PetType.Hamster, "Wuzzy", 1),

  new Person("John", "Doe"),
];

export const parks: Park[] = [
  new Park("Jurassic")
    .addAuthorizedPetType(PetType.Bird)
    .addAuthorizedPetType(PetType.Snake)
    .addAuthorizedPetType(PetType.Turtle),

  new Park("Central")
    .addAuthorizedPetType(PetType.Bird)
    .addAuthorizedPetType(PetType.Cat)
    .addAuthorizedPetType(PetType.Dog),

  new Park("Hippy")
    .addAuthorizedPetType(PetType.Bird)
    .addAuthorizedPetType(PetType.Cat)
    .addAuthorizedPetType(PetType.Dog)
    .addAuthorizedPetType(PetType.Turtle)
    .addAuthorizedPetType(PetType.Hamster)
    .addAuthorizedPetType(PetType.Snake),
];

export function getPersonNamed(fullName: string): Person {
  const person = people.find((p) => p.named(fullName));
  if (!person) {
    throw new Error(`Can't find person named: ${fullName}`);
  }
  return person;
}
