(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('debug', Debug);

    Debug.$inject = ['config'];

    /* @ngInject */
    function Debug (config) {
        //Usage:
        //<debug data="{{person.imageSource}}"/>
        var directive = {
            scope: {
                data: "="
            },
            template: '<pre>{{data | json}}</pre>',
            restrict: 'E'
        };
        return directive;
    }
})();
