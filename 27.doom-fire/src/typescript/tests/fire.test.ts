import { describe, expect, it } from "vitest";
import type { Dice } from "../src/dice.js";
import { createFire } from "../src/fire.js";

// Un dé truqué qui renvoie les valeurs données, dans l'ordre, puis recommence.
// Exemple : loadedDice(1, 0) renvoie 1, 0, 1, 0, ...
const loadedDice = (...faces: number[]): Dice => {
  let i = 0;
  return () => faces[i++ % faces.length]!;
};

describe("createFire", () => {
  it("allume uniquement la ligne du bas à l'intensité maximale", () => {
    const fire = createFire(3, 3);

    expect(fire.pixels).toEqual([
      0, 0, 0,
      0, 0, 0,
      36, 36, 36,
    ]);
  });
});

describe("spreadFire", () => {
  it.todo("avec un dé qui fait toujours 1, le feu monte tout droit en perdant 1 d'intensité");
  it.todo("avec un dé qui fait toujours 0, le feu part vers la droite sans perdre d'intensité");
  it.todo("le feu qui sort de la grille à droite réapparaît à gauche");
  it.todo("un pixel éteint éteint la case au-dessus de lui, sans lancer le dé");
  it.todo("quand deux pixels visent la même case, la dernière écriture gagne");
  it.todo("une case qui ne reçoit rien garde sa valeur précédente");
  it.todo("la ligne du bas ne change jamais");
  it.todo("ne modifie pas le feu reçu en paramètre");
});

describe("extinguish / ignite", () => {
  it.todo("extinguish met la ligne du bas à 0");
  it.todo("ignite remet la ligne du bas à 36");
});

describe("toRgba", () => {
  it.todo("convertit chaque intensité en 4 octets r, g, b, a (a = 255) grâce à la palette");
});
