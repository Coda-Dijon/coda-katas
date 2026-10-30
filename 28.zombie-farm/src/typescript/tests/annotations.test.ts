import { describe, expect, it } from "vitest";
import { getJsonMetadata } from "../src/annotations.js";
import { BodyPart } from "./models/bodyPart.js";
import { Brain } from "./models/brain.js";
import { Necromancer } from "./models/necromancer.js";
import { Zombie } from "./models/zombie.js";

// Fourni : montre comment relire les métadonnées posées par les décorateurs.
describe("getJsonMetadata", () => {
  it("renvoie {} pour un champ sans décorateur", () => {
    expect(getJsonMetadata(new Brain(), "grams")).toEqual({});
  });

  it("renvoie le nom et l'exclusion posés par @JsonName et @JsonIgnore", () => {
    const zombie = new Zombie();

    expect(getJsonMetadata(zombie, "name")).toEqual({ name: "zombie_name" });
    expect(getJsonMetadata(zombie, "humanIdentity")).toEqual({ ignore: true });
  });

  it("renvoie la classe d'un champ objet et celle des éléments d'un tableau", () => {
    const zombie = new Zombie();

    expect(getJsonMetadata(zombie, "supervisor").type?.()).toBe(Necromancer);
    expect(getJsonMetadata(zombie, "missingBodyParts").arrayOf?.()).toBe(BodyPart);
  });
});
