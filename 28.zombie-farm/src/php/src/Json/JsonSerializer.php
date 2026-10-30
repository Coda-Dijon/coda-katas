<?php

namespace ZombieFarm\Json;

use LogicException;

// À implémenter, par réflexion (ReflectionClass, ReflectionProperty, getAttributes, ...).
// Interdit : json_encode sur vos objets, c'est justement ce que vous êtes en train d'écrire.
final class JsonSerializer
{
    public function serialize(object $object): string
    {
        throw new LogicException("serialize n'est pas encore implémentée");
    }

    /**
     * Astuce : commencez par JsonParser::parse($json) pour obtenir un arbre de tableaux / valeurs.
     *
     * @template T of object
     * @param class-string<T> $class
     * @return T
     */
    public function deserialize(string $json, string $class): object
    {
        throw new LogicException("deserialize n'est pas encore implémentée");
    }
}
