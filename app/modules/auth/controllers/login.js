'use strict';

(function () {

    angular
        .module('auth')
        .controller('loginController', ['$scope', '$state', 'loginService', 'localStorageServiceWrapper', loginController]);

    function loginController($scope, $state, loginService, localStorageServiceWrapper) {

        $scope.login = function () {

            if ($scope.loginForm.username && $scope.loginForm.password) {
                // initial values
                $scope.error = false;
                $scope.disabled = true;

                // call login from service
                loginService.login($scope.loginForm.username, $scope.loginForm.password)
                    // handle success
                    .then(function (user) {

                        localStorageServiceWrapper.set("user", user);
                        localStorageServiceWrapper.set("authenticated", true);

                        $state.transitionTo('base.dashboard');
                        $scope.disabled = false;
                        $scope.loginForm = {};
                    })
                    // handle error
                    .catch(function (err) {
                        $scope.error = true;
                        $scope.errorMessage = err;
                        $scope.disabled = false;
                        $scope.loginForm = {};
                    });
            }
            else {
                $scope.errorMessage = "Please enter username and password";
            }
        };
    }

})();
