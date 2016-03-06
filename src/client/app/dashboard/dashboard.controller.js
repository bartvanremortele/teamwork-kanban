(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'TeamworkService', 'logger'];

    /* @ngInject */
    function DashboardController($q, TeamworkService, logger) {
        var vm = this;
        TeamworkService.getProjects().then(function(result) {
            vm.projects = result;
        })
    }
})();
