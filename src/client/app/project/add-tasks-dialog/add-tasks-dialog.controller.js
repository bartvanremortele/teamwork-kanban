(function () {
    'use strict';

    angular
        .module('app.project')
        .controller('AddTasksDialogController', AddTasksDialogController);

    AddTasksDialogController.$inject = ['$scope', '$q', 'projectId', 'TeamworkService', 'logger', '$uibModalInstance'];

    /* @ngInject */
    function AddTasksDialogController($scope, $q, projectId, TeamworkService, logger, $uibModalInstance) {
        var vm = this;

        TeamworkService.listMilestones(projectId, 'all').then(function(result) {
            vm.result = result;
            vm.milestones = result;
        });

        $scope.$watch('vm.selectedTasklist', function(newValue, oldValue) {
            if(newValue) {
                TeamworkService.getTasksByTasklist(newValue.id).then(function(result) {
                    vm.tasks = result;
                });
            }

        })

        $scope.ok = function () {
            $uibModalInstance.close(vm.selectedTasks);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
