import { describe, expect, it } from "vitest";
import type { Dice } from "../src/dice.js";
import { createFire, extinguish, ignite, spreadFire, toRgba, type Fire } from "../src/fire.js";
import { PALETTE } from "../src/palette.js";

// Un dé truqué qui renvoie les valeurs données, dans l'ordre, puis recommence.
// Exemple : loadedDice(1, 0) renvoie 1, 0, 1, 0, ...
const loadedDice = (...faces: number[]): Dice => {
  let i = 0;
  return () => faces[i++ % faces.length]!;
};

// Un dé qui fait toujours `face` et compte le nombre de fois où il a été lancé.
const countingDice = (face: number) => {
  const dice = Object.assign(() => {
    dice.rolls++;
    return face;
  }, { rolls: 0 });
  return dice;
};

const fireOf = (width: number, ...pixels: number[]): Fire => ({
  width,
  height: pixels.length / width,
  pixels,
});

describe("createFire", () => {
  it("allume uniquement la ligne du bas à l'intensité maximale", () => {
    const fire = createFire(3, 3);

    expect(fire.pixels).toEqual([
      0, 0, 0,
      0, 0, 0,
      36, 36, 36,
    ]);
  });

  it("conserve les dimensions demandées", () => {
    const fire = createFire(4, 2);

    expect(fire.width).toBe(4);
    expect(fire.height).toBe(2);
    expect(fire.pixels).toHaveLength(8);
  });
});

describe("spreadFire", () => {
  const foyer = fireOf(3,
    0, 0, 0,
    0, 0, 0,
    36, 20, 10,
  );

  it("avec un dé qui fait toujours 1, le feu monte tout droit en perdant 1 d'intensité", () => {
    expect(spreadFire(foyer, loadedDice(1)).pixels).toEqual([
      0, 0, 0,
      35, 19, 9,
      36, 20, 10,
    ]);
  });

  it("avec un dé qui fait toujours 0, le feu part vers la droite sans perdre d'intensité", () => {
    expect(spreadFire(foyer, loadedDice(0)).pixels).toEqual([
      0, 0, 0,
      10, 36, 20,
      36, 20, 10,
    ]);
  });

  it("avec un dé qui fait toujours 2, le feu part vers la gauche sans perdre d'intensité", () => {
    expect(spreadFire(foyer, loadedDice(2)).pixels).toEqual([
      0, 0, 0,
      20, 10, 36,
      36, 20, 10,
    ]);
  });

  it("le feu qui sort de la grille réapparaît de l'autre côté", () => {
    // dé 3 : deux cases à gauche et perte de 1. x = 0 -> -2 -> 1, x = 1 -> -1 -> 2, x = 2 -> 0
    expect(spreadFire(foyer, loadedDice(3)).pixels).toEqual([
      0, 0, 0,
      9, 35, 19,
      36, 20, 10,
    ]);
  });

  it("un pixel éteint éteint la case au-dessus de lui, sans lancer le dé", () => {
    const dice = countingDice(1);
    const fire = fireOf(2,
      5, 5,
      0, 0,
      36, 36,
    );

    expect(spreadFire(fire, dice).pixels).toEqual([
      0, 0,
      35, 35,
      36, 36,
    ]);
    expect(dice.rolls).toBe(2);
  });

  it("quand deux pixels visent la même case, la dernière écriture gagne", () => {
    const fire = fireOf(3,
      7, 7, 7,
      36, 36, 36,
    );

    // x = 0 -> 0 (35), x = 1 -> 2 (36), x = 2 -> 2 (35, écrase le 36)
    expect(spreadFire(fire, loadedDice(1, 0, 1)).pixels).toEqual([
      35, 7, 35,
      36, 36, 36,
    ]);
  });

  it("une case qui ne reçoit rien garde sa valeur précédente", () => {
    // L'exemple déroulé du README
    const image1 = spreadFire(createFire(4, 3), loadedDice(1, 0, 2, 3));

    expect(image1.pixels).toEqual([
      0, 0, 0, 0,
      35, 35, 36, 0,
      36, 36, 36, 36,
    ]);

    const dice = countingDice(1);
    const image2 = spreadFire(image1, dice);

    expect(image2.pixels).toEqual([
      34, 34, 35, 0,
      35, 35, 35, 35,
      36, 36, 36, 36,
    ]);
    expect(dice.rolls).toBe(7);
  });

  it("la ligne du bas ne change jamais", () => {
    const next = spreadFire(foyer, loadedDice(0, 1, 2, 3));

    expect(next.pixels.slice(6)).toEqual([36, 20, 10]);
  });

  it("ne modifie pas le feu reçu en paramètre", () => {
    const fire = createFire(3, 3);

    spreadFire(fire, loadedDice(1));

    expect(fire).toEqual(createFire(3, 3));
  });
});

describe("extinguish / ignite", () => {
  const fire = fireOf(2,
    3, 4,
    36, 36,
  );

  it("extinguish met la ligne du bas à 0", () => {
    expect(extinguish(fire).pixels).toEqual([
      3, 4,
      0, 0,
    ]);
  });

  it("ignite remet la ligne du bas à 36", () => {
    expect(ignite(extinguish(fire)).pixels).toEqual([
      3, 4,
      36, 36,
    ]);
  });

  it("ne modifient pas le feu reçu en paramètre", () => {
    extinguish(fire);

    expect(fire.pixels).toEqual([3, 4, 36, 36]);
  });
});

describe("toRgba", () => {
  it("convertit chaque intensité en 4 octets r, g, b, a (a = 255) grâce à la palette", () => {
    const rgba = toRgba(fireOf(3, 0, 12, 36), PALETTE);

    expect(rgba).toBeInstanceOf(Uint8ClampedArray);
    expect([...rgba]).toEqual([
      0x07, 0x07, 0x07, 255,
      0xdf, 0x4f, 0x07, 255,
      0xff, 0xff, 0xff, 255,
    ]);
  });
});
