<?php

namespace Tests\Models;

use ZombieFarm\Json\JsonName;

final class Necromancer
{
    public function __construct(
        public string $name = '',
        #[JsonName('dark_title')]
        public string $title = '',
        public int $yearsOfService = 0,
    ) {
    }
}
