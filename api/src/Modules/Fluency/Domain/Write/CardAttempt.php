<?php

namespace App\Modules\Fluency\Domain\Write;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity]
#[ORM\Table(name: 'card_attempt')]
class CardAttempt
{
    #[ORM\Id]
    #[ORM\Column(type: 'integer')]
    #[ORM\GeneratedValue]
    public int $id;
    public function __construct(
        #[ORM\Column(type: UuidType::NAME)]
        public Uuid $studentUuid,
        #[ORM\Column(type: 'datetime_immutable')]
        public \DateTimeImmutable $attemptedAt,
        #[ORM\Column(type: 'integer')]
        public int $firstOperand,
        #[ORM\Column(type: 'integer')]
        public int $secondOperand,
        #[ORM\Column(type: 'boolean')]
        public int $correct,
    ) {
    }

}
