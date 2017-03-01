(function () {
    'use strict';

    angular
        .module('categories')
        .config(['$stateProvider', stateProvider])

    function stateProvider($stateProvider) {

        $stateProvider
            .state('base.categories', {
                url: '/categories',
                views: {
                    'content': {
                        templateUrl: 'app/modules/categories/views/categories.html',
                        controller: 'categoriesController'
                    }
                }
            });
    }

})();
