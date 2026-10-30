<?php

namespace ZombieFarm\Json;

use Attribute;

// Fourni : une propriété marquée n'est jamais écrite dans le JSON, ni lue depuis le JSON.
#[Attribute(Attribute::TARGET_PROPERTY)]
final class JsonIgnore
{
}
