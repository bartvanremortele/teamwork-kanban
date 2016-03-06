(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellAuthenticatedController', ShellAuthenticatedController);

    ShellAuthenticatedController.$inject = ['$rootScope', '$timeout', '$location'];

    /* @ngInject */
    function ShellAuthenticatedController($rootScope, $timeout, $location) {
        var vm = this;
    }
})();
