<?php

namespace Tests\Models;

use ZombieFarm\Json\JsonIgnore;
use ZombieFarm\Json\JsonName;
use ZombieFarm\Json\ListOf;

final class Zombie
{
    // Convention collective des morts-vivants
    public static int $maxHoursPerDay = 24;

    public function __construct(
        #[JsonName('zombie_name')]
        public string $name = '',
        public int $hoursWorkedToday = 0,
        public float $brainsPerHour = 0.0,
        public bool $unionized = false,
        public ?Necromancer $supervisor = null,
        /** @var BodyPart[] */
        #[ListOf(BodyPart::class)]
        public array $missingBodyParts = [],
        /** @var string[] */
        public array $skills = [],
        // RGPD des morts-vivants : l'identité humaine ne doit jamais sortir de l'élevage
        #[JsonIgnore]
        public string $humanIdentity = '',
    ) {
    }
}
