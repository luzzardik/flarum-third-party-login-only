<?php

namespace luzzardik\FlarumThirdPartyLoginOnly\Controller;

use Flarum\Frontend\Document;
use Psr\Http\Message\ServerRequestInterface;

class RouteDisabledController
{
    public function __invoke(Document $document, ServerRequestInterface $request)
    {
        return $document;
    }
}
