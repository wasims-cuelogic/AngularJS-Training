(function () {

    'use strict';

    angular
        .module('dashboard')
        .controller('dashboardController', ['$scope', '$state', '$timeout', 'dashboardService', 'employeeService', dashboardController]);    

    function dashboardController($scope, $state, $timeout, dashboardService, employeeService) {
        $scope.blackSpinner = 'resource/images/blackSpinner.gif';

        $scope.deleteUsersArray = [];
        $scope.buttonValue = 'Delete Selected';

        var gender_order = {
            female: 1,
            male: 2
        };

        $scope.order = {
            field: 'name',
            reverse: false
        };

        $scope.reverseOrder = true;

        $scope.dynamicOrder = function (user) {
            var order = 0;
            switch ($scope.order.field) {
                case 'gender':
                    order = gender_order[user.gender];
                    break;
                default:
                    order = user[$scope.order.field];
            }

            return order;
        }

        $scope.userList = function () {
            //calling API and get user list
            $scope.getUsers = employeeService.getEmployeeList().userDetails;
            $scope.subTabMenus = [{
                'tabMenu': 'All',
                'action': 'dashboard'
            }, {
                'tabMenu': 'Proposals',
                'action': 'proposals'
            }]
        };

        $scope.selectRow = function (userId) {

            var indexOfUserId = $scope.deleteUsersArray.indexOf(userId);

            if (-1 == indexOfUserId) {
                $scope.deleteUsersArray.push(userId);
            } else {
                $scope.deleteUsersArray.splice(indexOfUserId, 1);
            }                        
        }        

        $scope.doubleClick = function (userId) {
            $state.go('base.edit-user', { uid: userId });
        }

        $scope.deleteEmployee = function (userId) {
            employeeService.deleteEmployee(userId)
                .then(function (user) {
                    $state.go('base.dashboard');
                });
        }

        $scope.deleteMultipleEmp = function () {

            if(!$scope.deleteUsersArray.length){
                return;
            }

            $scope.disabledButton = true;
            $scope.buttonValue = 'Deleting...';

            $timeout(function () {
                employeeService.deleteMultipleEmployees($scope.deleteUsersArray).then(function (res) {

                }).catch(function (msg) {

                    console.log(msg);
                });

                $scope.disabledButton = false;
                $scope.buttonValue = 'Delete Selected';

            }, 3000);

        }
    }

})();
