import type { Constructor } from "./annotations.js";

// À implémenter, par réflexion (Object.keys, Object.getPrototypeOf, getJsonMetadata, ...).
// Interdit : JSON.stringify sur vos objets, c'est justement ce que vous êtes en train d'écrire.
export class JsonSerializer {
  serialize(value: object): string {
    throw new Error("serialize n'est pas encore implémentée");
  }

  // Astuce : commencez par parseJson(json) pour obtenir un arbre d'objets / tableaux / valeurs.
  deserialize<T>(json: string, type: Constructor<T>): T {
    throw new Error("deserialize n'est pas encore implémentée");
  }
}
