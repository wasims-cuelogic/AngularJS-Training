'use strict';
(function () {

    angular
        .module('user')
        .controller('userController', ['$scope', 'employeeService', '$timeout', '$stateParams', '$state', userController]);

    function userController($scope, employeeService, $timeout, $stateParams, $state) {

        var userId = parseInt($stateParams.uid);

        $scope.is_edit = (!isNaN(userId) && typeof (userId) == "number" && userId > 0) ? true : false;
        $scope.title = ($scope.is_edit) ? 'Edit user' : 'Add User';
        $scope.submitBtnTxt = ($scope.is_edit) ? 'Update' : 'Add User';
        $scope.employeeDetails = ($scope.is_edit) ? employeeService.getEmployee(userId) : null;
        $scope.oldEmail = ($scope.is_edit) ? $scope.employeeDetails.email : null;

        $scope.cancelAction = function () {
            $state.go('base.dashboard');
        };

        $scope.saveUser = function () {

            var employee = {
                'fname': $scope.employeeDetails.fname,
                'lname': $scope.employeeDetails.lname,
                'email': $scope.employeeDetails.email,
                'department': $scope.employeeDetails.department,
                'gender': $scope.employeeDetails.gender,
                'salary': $scope.employeeDetails.salary
            };

            $timeout(function () {

                if ($scope.is_edit) {
                    employee['id'] = userId;
                    employeeService.updateEmployee(userId, employee)
                        .then(function (res) {
                            $state.go('base.dashboard');
                        })
                        .catch(function (err) {
                            console.log(err)
                        })
                } else {
                    employee['id'] = employeeService.getEmployeeList().length + 1;
                    employeeService.addEmployee(employee)
                        .then(function (result) {
                            $state.go('base.dashboard');
                        })
                        .catch(function (err) {
                            console.log(err)
                        });
                }

            }, 3000);
        };

        $scope.verifyDuplicate = function () {


            var duplicate = employeeService.isDuplicateEmail($scope.employeeDetails.email);

            if (duplicate && $scope.is_edit && $scope.employeeDetails.email === $scope.oldEmail) {
                duplicate = !duplicate;
            }

            if (duplicate) {

                $scope.userForm.email.$setValidity('duplicate', false);
                return $scope.userForm.email;
            }
            else {
                $scope.userForm.email.$setValidity('duplicate', true);
                return $scope.userForm.email;
            }
        }
    }

})();
