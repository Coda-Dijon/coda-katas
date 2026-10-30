import { JsonMappingException } from "./jsonMappingException.js";

// Fourni : transforme un texte JSON en arbre de valeurs.
//   objet   -> objet littéral { [key: string]: JsonTree } (les clés gardent leur ordre)
//   tableau -> JsonTree[]
//   chaîne / nombre / booléen / null -> string / number / boolean / null
export type JsonTree = string | number | boolean | null | JsonTree[] | { [key: string]: JsonTree };

export const parseJson = (json: string): JsonTree => {
  try {
    return JSON.parse(json) as JsonTree;
  } catch (error) {
    throw new JsonMappingException(`JSON invalide : ${(error as Error).message}`, { cause: error });
  }
};
