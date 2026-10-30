import { describe, expect, it } from "vitest";
import { JsonSerializer } from "../src/jsonSerializer.js";
import { BodyPart } from "./models/bodyPart.js";
import { Brain } from "./models/brain.js";
import { Necromancer } from "./models/necromancer.js";
import { Zombie } from "./models/zombie.js";

const serializer = new JsonSerializer();

const gerard = (): Zombie =>
  Object.assign(new Zombie(), {
    name: "Gérard",
    hoursWorkedToday: 23,
    brainsPerHour: 2.5,
    unionized: false,
    supervisor: Object.assign(new Necromancer(), {
      name: "Morgana",
      title: "Contremaîtresse des Ténèbres",
      yearsOfService: 666,
    }),
    missingBodyParts: [
      Object.assign(new BodyPart(), { name: "bras gauche", reattachable: true }),
      Object.assign(new BodyPart(), { name: "dignité", reattachable: false }),
    ],
    skills: ["porter des cartons", "gémir en réunion", "fixer le mur"],
    humanIdentity: "Gérard Dupont, ex-comptable",
  });

describe("serialize", () => {
  it("sérialise les entiers dans l'ordre de déclaration", () => {
    const brain = Object.assign(new Brain(), { grams: 1200, neuronsLeft: 3 });

    expect(serializer.serialize(brain)).toBe('{"grams":1200,"neuronsLeft":3}');
  });

  it.todo("sérialise un objet sans champ en {}");
  it.todo('sérialise les chaînes en échappant ", \\ et le retour à la ligne');
  it.todo("sérialise les décimaux, les booléens et null");
  it.todo("sérialise un objet imbriqué");
  it.todo("sérialise les tableaux de chaînes et d'objets");
  it.todo("ignore les champs statiques");
  it.todo("ignore les champs marqués @JsonIgnore");
  it.todo("renomme les champs marqués @JsonName");
  it.todo("sérialise Gérard au complet");
});

describe("deserialize", () => {
  it.todo("désérialise les entiers");
  it.todo("désérialise les chaînes, les décimaux, les booléens et null");
  it.todo("désérialise un objet imbriqué (@JsonType)");
  it.todo("désérialise les tableaux de chaînes et d'objets (@JsonArrayOf)");
  it.todo("lit la clé @JsonName");
  it.todo("ne lit jamais un champ @JsonIgnore");
  it.todo("garde la valeur par défaut d'un champ absent du JSON");
  it.todo("ignore les clés JSON inconnues");
  it.todo("lève une JsonMappingException si un type ne correspond pas");
  it.todo("lève une JsonMappingException si la racine n'est pas un objet");
  // Astuce : toEqual compare champ par champ, toBeInstanceOf vérifie la classe
  it.todo("deserialize(serialize(gérard)) redonne le même zombie");
});
