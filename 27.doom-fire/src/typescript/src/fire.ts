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

const withBottomRow = (fire: Fire, intensity: number): Fire => ({
  ...fire,
  pixels: fire.pixels.map((p, i) => (i >= (fire.height - 1) * fire.width ? intensity : p)),
});

export const createFire = (width: number, height: number): Fire =>
  withBottomRow({ width, height, pixels: Array(width * height).fill(0) }, MAX_INTENSITY);

// Ramène x dans [0, width[ : ce qui sort à droite réapparaît à gauche, et inversement.
const wrap = (x: number, width: number) => ((x % width) + width) % width;

export const spreadFire = (fire: Fire, dice: Dice): Fire => {
  const { width, height, pixels } = fire;
  // On lit toujours dans `pixels` (image courante) et on écrit dans `next` (image suivante).
  const next = [...pixels];
  for (let y = 1; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const intensity = pixels[y * width + x]!;
      if (intensity === 0) {
        next[(y - 1) * width + x] = 0;
      } else {
        const roll = dice();
        next[(y - 1) * width + wrap(x - roll + 1, width)] = intensity - (roll & 1);
      }
    }
  }
  return { width, height, pixels: next };
};

export const extinguish = (fire: Fire): Fire => withBottomRow(fire, 0);
export const ignite = (fire: Fire): Fire => withBottomRow(fire, MAX_INTENSITY);

export const toRgba = (fire: Fire, palette: readonly Rgb[]): Uint8ClampedArray =>
  Uint8ClampedArray.from(fire.pixels.flatMap((p) => [...palette[p]!, 255]));
