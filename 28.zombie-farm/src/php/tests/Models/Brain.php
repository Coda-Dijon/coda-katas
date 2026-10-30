<?php

namespace Tests\Models;

final class Brain
{
    public function __construct(
        public int $grams = 0,
        public int $neuronsLeft = 0,
    ) {
    }
}
