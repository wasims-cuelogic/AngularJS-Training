'use strict';
(function () {

    angular
        .module('user')
        .controller('userController', ['$scope', 'employeeService', '$stateParams', '$state', userController]);

    function userController($scope, employeeService, $stateParams, $state) {

        var userId = parseInt($stateParams.uid);

        $scope.is_edit = (!isNaN(userId) && typeof (userId) == "number" && userId > 0) ? true : false;
        $scope.title = ($scope.is_edit) ? 'Edit user' : 'Add User';
        $scope.submitBtnTxt = ($scope.is_edit) ? 'Update' : 'Add User';
        $scope.employeeDetails = ($scope.is_edit) ? employeeService.getEmployee(userId) : null;

        $scope.cancelAction = function () {
            $state.transitionTo('base.dashboard');
        };

        $scope.saveUser = function () {
            var employee = {
                'fname': $scope.employeeDetails.fname,
                'lname': $scope.employeeDetails.lname,
                'email': $scope.employeeDetails.username,
                'department': $scope.employeeDetails.department,
                'gender': $scope.employeeDetails.gender,
                'salary': $scope.employeeDetails.salary
            };

            if ($scope.is_edit) {
                employee['id'] = userId;
                employeeService.updateEmployee(userId, employee)
                    .then(function (res) {
                        $state.transitionTo('base.dashboard');
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            } else {
                employee['id'] = employeeService.getEmpList().length + 1;
                userService.addUser(emp);
            }
        }
    }

})();
