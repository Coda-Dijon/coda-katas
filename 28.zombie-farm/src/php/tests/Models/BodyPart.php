<?php

namespace Tests\Models;

final class BodyPart
{
    public function __construct(
        public string $name = '',
        public bool $reattachable = false,
    ) {
    }
}
