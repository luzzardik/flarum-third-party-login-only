<?php

namespace luzzardik\FlarumThirdPartyLoginOnly;

use Flarum\Extend;
use luzzardik\FlarumThirdPartyLoginOnly\Api\CreateUserController;

return [
    // Forum
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__ . '/less/Forum.less'),

    // Admin
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    // Disable default authenticating endpoints
    (new Extend\Routes('forum'))
        ->remove('login')
        ->post('/login', 'login.disabled', Api\ApiRouteDisabledController::class)

        // Disable password reset
        ->remove('savePassword')
        ->post('/reset', 'savePassword.disabled', Controller\RouteDisabledController::class)

        // Disable password reset token validation
        ->remove('resetPassword')
        ->get('/reset/{token}', 'resetPassword.disabled', Api\ApiRouteDisabledController::class),

    // Remove api endpoints
    (new Extend\Routes('api'))
        ->remove('forgot')
        ->post('/forgot', 'forgot.disabled', Api\ApiRouteDisabledController::class)

        ->remove('users.create')
        ->post('/users', 'users.create', Api\CreateUserController::class),

    // Register settings to forum
    (new Extend\Settings)
    ->serializeToForum(
        'forgotPasswordLink',
        'luzzardik-third-party-login-only.forgotPasswordLink'
    )
    ->serializeToForum(
        'replaceLoginWithFoFPassport',
        'luzzardik-third-party-login-only.replaceLoginWithFoFPassport'
    )
    ->serializeToForum(
        'changePasswordLink',
        'luzzardik-third-party-login-only.changePasswordLink'
    )
    ->serializeToForum(
        'allowChangeMail',
        'luzzardik-third-party-login-only.allowChangeMail'
    )
    ->serializeToForum(
        'signUpWelcomeText',
        'luzzardik-third-party-login-only.signUpWelcomeText'
    )

    ->default('luzzardik-third-party-login-only.forgotPasswordLink', '')
    ->default('luzzardik-third-party-login-only.replaceLoginWithFoFPassport', false)
    ->default('luzzardik-third-party-login-only.changePasswordLink', '')
    ->default('luzzardik-third-party-login-only.allowChangeMail', false)
    ->default('luzzardik-third-party-login-only.signUpWelcomeText', '')
];
