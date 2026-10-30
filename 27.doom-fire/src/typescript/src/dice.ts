// Fourni : un "dé" renvoie un entier entre 0 et 3 (inclus).
// En production on utilise le hasard, dans les tests on injecte un dé truqué.
export type Dice = () => number;

export const randomDice: Dice = () => Math.floor(Math.random() * 4);
