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

        $dateCategories = [
            new \DateTimeImmutable('-2 days'),    // current week
            new \DateTimeImmutable('-14 days'),   // past month
            new \DateTimeImmutable('-35 days'),   // all time
        ];

        $randomizer = new Randomizer();
        foreach ($users as $user) {
            foreach (range(1, 12) as $operand1) {
                foreach (range(1, 12) as $operand2) {
                    foreach ($dateCategories as $i => $date) {
                        $correct = $randomizer->getFloat(0.0, 1.0) > 0.5;
                        $attempt = new CardAttempt($user, $date, $operand1, $operand2, $correct);
                        $manager->persist($attempt);
                    }
                }
            }
        }
        $manager->flush();
    }
}
