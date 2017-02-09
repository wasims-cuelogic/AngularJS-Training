'use strict';

(function () {

    angular
        .module('auth')
        .controller('loginController', ['$scope', '$state', 'loginService', 'localStorageServiceWrapper', loginController]);

    function loginController($scope, $state, loginService, localStorageServiceWrapper) {

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
    }

})();
