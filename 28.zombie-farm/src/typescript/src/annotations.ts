// Fourni : les décorateurs et la façon de relire leurs métadonnées.
// TypeScript efface les types à la compilation : à l'exécution, on ne sait pas qu'un champ
// `supervisor: Necromancer | null` contient un Necromancer. Les décorateurs servent à garder
// cette information (et les autres) quelque part où la réflexion peut la retrouver.

export type Constructor<T = unknown> = new () => T;

export type JsonMetadata = {
  name?: string; // @JsonName : la clé JSON à utiliser à la place du nom du champ
  ignore?: boolean; // @JsonIgnore : jamais écrit dans le JSON, ni lu depuis le JSON
  type?: () => Constructor; // @JsonType : la classe d'un champ objet
  arrayOf?: () => Constructor; // @JsonArrayOf : la classe des éléments d'un tableau d'objets
};

const metadataByPrototype = new WeakMap<object, Map<string, JsonMetadata>>();

const annotate =
  (metadata: JsonMetadata) =>
  (prototype: object, property: string | symbol): void => {
    const fields = metadataByPrototype.get(prototype) ?? new Map<string, JsonMetadata>();
    const key = String(property);
    fields.set(key, { ...fields.get(key), ...metadata });
    metadataByPrototype.set(prototype, fields);
  };

export const JsonName = (name: string) => annotate({ name });
export const JsonIgnore = () => annotate({ ignore: true });
// Les classes sont passées via une fonction (() => Necromancer) car une classe
// ne peut pas être utilisée avant sa déclaration dans le fichier.
export const JsonType = (type: () => Constructor) => annotate({ type });
export const JsonArrayOf = (type: () => Constructor) => annotate({ arrayOf: type });

// Renvoie les métadonnées du champ `property` d'un objet ({} s'il n'est pas décoré).
export const getJsonMetadata = (instance: object, property: string): JsonMetadata => {
  for (let prototype = Object.getPrototypeOf(instance); prototype; prototype = Object.getPrototypeOf(prototype)) {
    const metadata = metadataByPrototype.get(prototype)?.get(property);
    if (metadata) return metadata;
  }
  return {};
};
