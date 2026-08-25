import { Pet } from "./pet";
import { PetType } from "./pet-type";

export class Person {
  readonly firstName: string;
  readonly lastName: string;
  readonly pets: ReadonlyArray<Pet>;

  constructor(firstName: string, lastName: string, pets: Pet[] = []) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.pets = [...pets];
  }

  named(fullName: string): boolean {
    return fullName === `${this.firstName} ${this.lastName}`;
  }

  addPet(type: PetType, name: string, age: number): Person {
    return new Person(this.firstName, this.lastName, [...this.pets, { type, name, age }]);
  }

  get numberOfPets(): number {
    return this.pets.length;
  }

  isPetPerson(): boolean {
    return this.numberOfPets >= 1;
  }
}
