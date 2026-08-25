import { describe, expect, it } from "vitest";
import { PetType } from "../../src/02-queries/data/pet-type";
import { Person } from "../../src/02-queries/data/person";
import { sameMembers } from "../support/collections";

describe("Part2", () => {
  it("getAllPetTypesOfAllPeople", () => {
    const petTypes: PetType[] = [];

    sameMembers(petTypes, [
      PetType.Cat,
      PetType.Dog,
      PetType.Snake,
      PetType.Bird,
      PetType.Turtle,
      PetType.Hamster,
    ]);
  });

  it("totalPetAge", () => {
    const totalAge = 0;

    expect(totalAge).toBe(17);
  });

  it("petsNameSorted", () => {
    const sortedPetNames: string | undefined = undefined;

    expect(sortedPetNames).toBe("Dolly, Fuzzy, Serpy, Speedy, Spike, Spot, Tabby, Tweety, Wuzzy");
  });

  it("sortByAge", () => {
    const sortedAgeList: number[] = [];

    expect(sortedAgeList).toHaveLength(4);
    sameMembers(sortedAgeList, [1, 2, 3, 4]);
  });

  it("sortByDescAge", () => {
    const sortedAgeList: number[] = [];

    expect(sortedAgeList).toHaveLength(4);
    sameMembers(sortedAgeList, [4, 3, 2, 1]);
  });

  it("top3OlderPets", () => {
    const top3OlderPets: string[] = [];

    expect(top3OlderPets).toHaveLength(3);
    sameMembers(top3OlderPets, ["Spike", "Dolly", "Tabby"]);
  });

  it("getFirstPersonWithAtLeast2Pets", () => {
    const firstPersonWithAtLeast2Pets: Person | undefined = undefined;

    expect(firstPersonWithAtLeast2Pets!.firstName).toBe("Bob");
  });

  it("isThereAnyPetOlderThan4", () => {
    const isThereAnyPetOlderThan4 = true;

    expect(isThereAnyPetOlderThan4).toBe(false);
  });

  it("isEveryPetsOlderThan1", () => {
    const allOlderThan1 = false;

    expect(allOlderThan1).toBe(false);
  });

  it("getListOfPossibleParksForAWalkPerPerson", () => {
    const possibleParksForAWalkPerPerson = new Map<string, string[]>();

    sameMembers(possibleParksForAWalkPerPerson.get("John Doe")!, ["Jurassic", "Central", "Hippy"]);
    sameMembers(possibleParksForAWalkPerPerson.get("Jake Snake")!, ["Jurassic", "Hippy"]);
  });
});
