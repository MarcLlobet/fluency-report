<?php

namespace App\Modules\Fluency\UI;

use App\Modules\Fluency\Domain\Write\CardAttempt;
use Doctrine\ORM\EntityManagerInterface;
use Nelmio\ApiDocBundle\Attribute\Model;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[OA\Tag(name: "fluency")]
class AttemptsController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $emi,
    ){}

    #[Route(path:'/attempts', methods: ['GET'])]
    #[OA\Response(
        response: 200,
        description: "Get all fluency attempts done",
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: CardAttempt::class))
        )
    )]
    public function __invoke(): Response
    {
        $allCards = $this->emi->getRepository(CardAttempt::class)->findAll();
        return new JsonResponse($allCards);
    }

}