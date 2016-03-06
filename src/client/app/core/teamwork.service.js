(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('TeamworkService', TeamworkService);

    TeamworkService.$inject = ['ENV_CONFIG', '$http', '$q', 'exception', 'logger', 'Base64'];

    /* @ngInject */
    function TeamworkService(ENV_CONFIG, $http, $q, exception, logger, Base64) {
        var service = {
            config: {
                headers: {
                    'Authorization': 'Basic ' + Base64.encode(ENV_CONFIG.teamwork.apikey + ':' + 'xxx'),
                }
            },
            getProjects: getProjects,
            listMilestones: listMilestones,
            getTasksByTasklist: getTasksByTasklist
        };

        return service;

        function success(response) {
            return response.data;
        }

        function fail(e) {
            return exception.catcher('XHR Failed')(e);
        }

        function getProjects() {
            return $http.get(ENV_CONFIG.teamwork.baseURI + '/projects.json', service.config)
                .then(success)
                .catch(fail);
        }

        function listMilestones(projectId, filter) {
            return $http.get(ENV_CONFIG.teamwork.baseURI + '/projects/' + projectId + '/milestones.json?find=' + filter, service.config)
                .then(success)
                .catch(fail);
        }
        function getTasksByTasklist(tasklistId) {
            return $http.get(ENV_CONFIG.teamwork.baseURI + '/tasklists/' + tasklistId + '/tasks.json', service.config)
                .then(success)
                .catch(fail);
        }
    }
})();
