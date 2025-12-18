<?php

namespace App\DataFixtures;

use App\Modules\Fluency\Domain\Write\CardAttempt;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Random\Randomizer;
use Symfony\Component\Uid\Uuid;

class CardAttemptFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $users = array_map(fn(int $id): Uuid => Uuid::v7(), range(1, 5));

        foreach ($users as $user) {
            foreach(range(1, 10) as $operand1) {
                foreach(range(1, 10) as $operand2) {
                    $attempts = new Randomizer()->getInt(0, 3);
                    foreach(range(1, $attempts) as $attempt) {
                        $result = new Randomizer()->getFloat(0.0, 1.0) > 0.2;
                        $attempt = new CardAttempt($user, new \DateTimeImmutable()->add(\DateInterval::createFromDateString($attempt.' days')), $operand1, $operand2, $result);
                        $manager->persist($attempt);
                    }
                }
            }
        }
        $manager->flush();
    }
}
