'use strict';

(function () {

    // Declare app level module
    angular
        .module('angularClientApp', [
            'ui.router',
            'ngAnimate',
            'angularLazyImg',
            'ui.bootstrap',
            'localStorage.service',
            'config',
            'auth',
            'base',
            'dashboard',
            'user'

        ])
        .config(['$urlRouterProvider', '$locationProvider', '$provide', initializeConfigurationPhase]);

    function initializeConfigurationPhase($urlRouterProvider, $locationProvider, $provide) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $urlRouterProvider.otherwise('/login');

        $provide.provider('credentials', function () {
            this.$get = function () {
                var credential = [{
                    "id": 1,
                    "email": "wasim.sayyed@cuelogic.com",
                    "password": "wasim@123"
                }, {
                    "id": 2,
                    "email": "ayush@cuelogic.com",
                    "password": "ayush@123",
                }, {
                    "id": 3,
                    "email": "bobo.com",
                    "password": "bobo@123",
                }];
                return {
                    credential: credential
                };
            }
        })
    }

})();
