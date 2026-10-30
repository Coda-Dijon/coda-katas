<?php

namespace ZombieFarm\Json;

use Attribute;

// Fourni : en PHP, le type `array` ne dit pas ce qu'il contient.
// Cet attribut indique la classe des éléments d'un tableau d'objets.
#[Attribute(Attribute::TARGET_PROPERTY)]
final class ListOf
{
    /** @param class-string $class */
    public function __construct(public string $class)
    {
    }
}
