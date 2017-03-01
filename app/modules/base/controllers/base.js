'use strict';
(function () {

    angular
        .module('base')
        .controller('baseController', ['$scope', '$state', 'menuService', 'employeeService', '$rootScope', 'localStorageServiceWrapper', baseController]);

    function baseController($scope, $state, menuService, employeeService, $rootScope, localStorageServiceWrapper) {

        //calling API and get menus
        $scope.getMenus = menuService.getSidebarMenuList().userMenu;

        var user = localStorageServiceWrapper.get('user');

        $rootScope.$on('authorized', function () {

            $scope.currentUser = employeeService.getEmployee(user.id);
        });

        $rootScope.$on('unauthorized', function () {
            var currentUser = localStorageServiceWrapper.set('currentUser', null);
            $state.go('login');

        });
    }

})();
