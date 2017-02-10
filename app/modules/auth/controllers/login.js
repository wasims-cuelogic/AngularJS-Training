'use strict';

(function () {

    angular
        .module('auth')
        .controller('loginController', ['$scope', '$state', '$location', 'loginService', 'localStorageServiceWrapper', loginController]);

    function loginController($scope, $state, $location, loginService, localStorageServiceWrapper) {

        $scope.user = {};

        $scope.login = function () {

            if ($scope.user.email && $scope.user.password) {

                // call login from service
                loginService.login($scope.user.email, $scope.user.password)
                    // handle success
                    .then(function (user) {

                        localStorageServiceWrapper.set("user", user);
                        localStorageServiceWrapper.set("authenticated", true);

                        $state.go('base.dashboard');
                    })
                    // handle error
                    .catch(function (err) {
                        $scope.errorMessage = err;
                        $scope.user.password = "";
                        $scope.loginForm.$setPristine();
                    });
            }
            else {
                $scope.errorMessage = "Please enter username and password";
            }
        };

        $scope.logout = function (user) {

            // call logout from service
            loginService.logout(user)
                // handle success
                .then(function (result) {
                    $scope.successMessage = "Logout successfully!";
                    $location.path('/login');
                })
                // handle error
                .catch(function (err) {

                });
        }
    }

})();
