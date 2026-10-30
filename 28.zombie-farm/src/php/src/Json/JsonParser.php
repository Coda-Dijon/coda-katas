<?php

namespace ZombieFarm\Json;

// Fourni : transforme un texte JSON en arbre de valeurs PHP.
//   objet   -> tableau associatif (les clés gardent leur ordre)
//   tableau -> liste (array_is_list() renvoie true)
//   chaîne  -> string, nombre -> int ou float, true / false -> bool, null -> null
// Attention : {} et [] donnent tous les deux un tableau vide.
final class JsonParser
{
    public static function parse(string $json): mixed
    {
        try {
            return json_decode($json, associative: true, flags: JSON_THROW_ON_ERROR);
        } catch (\JsonException $e) {
            throw new JsonMappingException("JSON invalide : {$e->getMessage()}", previous: $e);
        }
    }
}
