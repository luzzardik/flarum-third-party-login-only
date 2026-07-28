<?php

namespace luzzardik\FlarumThirdPartyLoginOnly\Middleware;

use Flarum\User\Exception\PermissionDeniedException;
use Illuminate\Support\Arr;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

class BlockNormalRegistration implements MiddlewareInterface
{
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        // Intercept only the API request intended to create a new user
        if ($request->getAttribute('routeName') === 'users.create' && $request->getMethod() === 'POST') {

            // Disable normal sign ups (without oAuth token)
            if (!Arr::has($request->getParsedBody(), 'data.attributes.token')) {
                throw new PermissionDeniedException("Route is disabled");
            }
        }

        // Pass the request further down the chain if it has a token or is a different route
        return $handler->handle($request);
    }
}
