<?php

namespace ZombieFarm\Json;

use RuntimeException;

// Fourni : levée quand un JSON ne peut pas être converti (JSON invalide, type inattendu, ...).
final class JsonMappingException extends RuntimeException
{
}
