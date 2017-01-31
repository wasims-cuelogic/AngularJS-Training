'use strict';

(function () {

    angular
        .module('auth')
        .controller('loginController', ['$scope', '$state', 'loginService', loginController]);

    function loginController($scope, $state, loginService) {
        console.log("Inside login controller");

        $scope.login = function () {           
            // initial values
            $scope.error = false;
            $scope.disabled = true;

            // call login from service
            loginService.login($scope.loginForm.username, $scope.loginForm.password)
                // handle success
                .then(function () {
                    $location.path('/dashboard');
                    $scope.disabled = false;
                    $scope.loginForm = {};
                })
                // handle error
                .catch(function () {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid username and/or password";
                    $scope.disabled = false;
                    $scope.loginForm = {};
                });

        };
    }

})();
