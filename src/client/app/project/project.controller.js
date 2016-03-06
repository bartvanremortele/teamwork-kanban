(function () {
    'use strict';

    angular
        .module('app.project')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['ENV_CONFIG', '$q', '$stateParams', 'TeamworkService', 'logger', '$uibModal', '$firebaseObject', '$firebaseArray'];

    /* @ngInject */
    function ProjectController(ENV_CONFIG, $q, $stateParams, TeamworkService, logger, $uibModal, $firebaseObject, $firebaseArray) {
        var vm = this;

        var sprintRef = new Firebase(ENV_CONFIG.firebase.baseURI + '/currentSprint');
        var tasksRef = new Firebase(ENV_CONFIG.firebase.baseURI + '/tasks');
        vm.sprint = $firebaseObject(sprintRef.child('properties'));
        vm.todos = $firebaseArray(sprintRef.child('todos'));
        vm.inprogress = $firebaseArray(sprintRef.child('inprogress'));
        vm.totest = $firebaseArray(sprintRef.child('totest'));
        vm.done = $firebaseArray(sprintRef.child('done'));

        vm.sprint.$loaded().then(function() {
            if(!vm.sprint.name) {
                vm.sprint.name = 'New sprint';
                vm.sprint.created = Firebase.ServerValue.TIMESTAMP;
                vm.sprint.$save();
            }
        });

        vm.showAddTaskDialog = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/project/add-tasks-dialog/add-tasks-dialog.html',
                controller: 'AddTasksDialogController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    projectId: function () {
                        return $stateParams.projectId;
                    }
                }
            });

            modalInstance.result.then(function (selectedTasks) {
                selectedTasks.forEach(function(task) {
                    vm.todos.$add({
                        task: task,
                        meta: {
                            state: 'TODO'
                        }
                    });
                })
            }, function () {});
        };

        vm.dropCallback = function(event, index, item, external, type, toState) {

            if(item.meta.state === 'TODO') {
                vm.todos.$remove(index);
            } else if(item.meta.state === 'IN_PROGRESS') {
                vm.inprogress.$remove(item);
            } else if(item.meta.state === 'TO_TEST') {
                vm.totest.$remove(item);
            } else if(item.meta.state === 'DONE') {
                vm.done.$remove(item);
            }

            if(toState === 'TODO') {
                vm.todos.$add(item);
            } else if(toState === 'IN_PROGRESS') {
                vm.inprogress.$add(item);
            } else if(toState === 'TO_TEST') {
                vm.totest.$add(item);
            } else if(toState === 'DONE') {
                vm.done.$add(item);
            }

            return true;
        };
    }
})();
