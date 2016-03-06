(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellGuestController', ShellGuestController);

    ShellGuestController.$inject = ['$rootScope', '$timeout', '$location'];

    /* @ngInject */
    function ShellGuestController($rootScope, $timeout, $location) {
        var vm = this;
    }
})();
