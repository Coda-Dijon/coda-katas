import { describe, expect, it } from "vitest";
import { people, getPersonNamed } from "../../src/02-queries/data/persons";
import { Person } from "../../src/02-queries/data/person";
import { sameMembers } from "../support/collections";

describe("Part1", () => {
  it("getFirstNamesOfAllPeople", () => {
    const firstNames: string[] = [];

    sameMembers(firstNames, ["Mary", "Bob", "Ted", "Jake", "Barry", "Terry", "Harry", "John"]);
  });

  it("getNamesOfMarySmithsPets", () => {
    const person = getPersonNamed("Mary Smith");

    const names: string[] = [];

    expect(names).toEqual(["Tabby"]);
  });

  it("getPeopleWithCats", () => {
    const peopleWithCats: string[] = [];

    expect(peopleWithCats).toHaveLength(2);
  });

  it("getPeopleWithoutCats", () => {
    const peopleWithoutCats: string[] = [];

    expect(peopleWithoutCats).toHaveLength(6);
  });

  it("doAnyPeopleHaveCats", () => {
    const doAnyPeopleHaveCats = false;

    expect(doAnyPeopleHaveCats).toBe(true);
  });

  it("doAllPeopleHavePets", () => {
    const predicate = (_person: Person): boolean => true;
    const result = people.every(predicate);

    expect(result).toBe(false);
  });

  it("howManyPeopleHaveCats", () => {
    const count = 0;

    expect(count).toBe(2);
  });

  it("findMarySmith", () => {
    const result: Person | undefined = undefined;

    expect(result!.firstName).toBe("Mary");
    expect(result!.lastName).toBe("Smith");
  });

  it("getPeopleWithPets", () => {
    const petPeople = 0;

    expect(petPeople).toBe(7);
  });
});
