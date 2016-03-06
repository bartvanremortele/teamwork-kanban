(function() {
    'use strict';

    angular
        .module('app')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app',
                config: {
                    abstract: true,
                    templateUrl: 'app/layout/shell-authenticated.html',
                    controller: 'ShellAuthenticatedController',
                    controllerAs: 'shell'
                }
            },
            {
                state: 'guest',
                config: {
                    abstract: true,
                    templateUrl: 'app/layout/shell-guest.html',
                    controller: 'ShellGuestController',
                    controllerAs: 'shell'
                }
            }
        ];
    }
})();
