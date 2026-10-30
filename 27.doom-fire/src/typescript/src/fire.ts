import type { Dice } from "./dice.js";
import type { Rgb } from "./palette.js";

export const MAX_INTENSITY = 36;

// Une grille de `width` x `height` intensités (entre 0 et MAX_INTENSITY).
// `pixels` est stocké ligne par ligne : la case (x, y) est à l'index y * width + x.
// La ligne 0 est en haut, la ligne height - 1 est en bas (le foyer).
export type Fire = {
  readonly width: number;
  readonly height: number;
  readonly pixels: readonly number[];
};

// À implémenter : toutes les fonctions ci-dessous sont utilisées par la visualisation.

export const createFire = (width: number, height: number): Fire => {
  throw new Error("createFire n'est pas encore implémentée");
};

export const spreadFire = (fire: Fire, dice: Dice): Fire => {
  throw new Error("spreadFire n'est pas encore implémentée");
};

export const extinguish = (fire: Fire): Fire => {
  throw new Error("extinguish n'est pas encore implémentée");
};

export const ignite = (fire: Fire): Fire => {
  throw new Error("ignite n'est pas encore implémentée");
};

export const toRgba = (fire: Fire, palette: readonly Rgb[]): Uint8ClampedArray => {
  throw new Error("toRgba n'est pas encore implémentée");
};
