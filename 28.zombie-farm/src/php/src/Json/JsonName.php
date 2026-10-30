<?php

namespace ZombieFarm\Json;

use Attribute;

// Fourni : la clé JSON à utiliser à la place du nom de la propriété.
#[Attribute(Attribute::TARGET_PROPERTY)]
final class JsonName
{
    public function __construct(public string $name)
    {
    }
}
