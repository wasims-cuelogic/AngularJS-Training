'use strict';
(function () {

    angular
        .module('base')
        .controller('baseController', ['$scope', '$state', 'menuService', 'employeeService', 'localStorageServiceWrapper', baseController]);

    function baseController($scope, $state, menuService,employeeService, localStorageServiceWrapper) {

        //calling API and get menus
        $scope.getMenus = menuService.getSidebarMenuList().userMenu;

        var user = localStorageServiceWrapper.get('user');

        $scope.currentUserDetails = employeeService.getEmployee(user.id);        

    }

})();
