(function () {
    'use strict';

    angular
        .module('app.core', [
            'environment.config',
            'firebase',
            'ngAnimate',
            'ngSanitize',
            'blocks.exception',
            'blocks.logger',
            'blocks.router',
            'ui.router',
            'ngplus'
        ]);
})();
