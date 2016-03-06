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
                var record = vm.todos.$getRecord(item.$id);
                vm.todos.$remove(record);
            } else if(item.meta.state === 'IN_PROGRESS') {
                var record = vm.inprogress.$getRecord(item.$id);
                vm.inprogress.$remove(record);
            } else if(item.meta.state === 'TO_TEST') {
                var record = vm.totest.$getRecord(item.$id);
                vm.totest.$remove(record);
            } else if(item.meta.state === 'DONE') {
                var record = vm.done.$getRecord(item.$id);
                vm.done.$remove(record);
            }

            // Reflect new state
            item.meta.state = toState;

            if(toState === 'TODO') {
                vm.todos.$add(item);
            } else if(toState === 'IN_PROGRESS') {
                item.meta.startedOn = Firebase.ServerValue.TIMESTAMP;
                vm.inprogress.$add(item);
            } else if(toState === 'TO_TEST') {
                item.meta.readyOn = Firebase.ServerValue.TIMESTAMP;
                vm.totest.$add(item);
            } else if(toState === 'DONE') {
                item.meta.doneOn = Firebase.ServerValue.TIMESTAMP;
                vm.done.$add(item);
            }

            return true;
        };

        vm.getTotalEstimatedMinutes = function() {
            var total = 0;

            for (var i = 0; i < vm.todos.length; i++) {
                total += vm.todos[i].task['estimated-minutes'] || 0
            }

            for (var j = 0; j <  vm.inprogress.length; j++) {
                total += vm.inprogress[j].task['estimated-minutes'] || 0
            }

            return total;
        }
    }
})();
