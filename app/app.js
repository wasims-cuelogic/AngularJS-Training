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
            'user',
            'categories'

        ])
        .config(['$urlRouterProvider', '$locationProvider', '$provide', '$httpProvider', initializeConfigurationPhase])
        .run(['$rootScope', '$state', 'loginService', authenticationHandler]);

    function initializeConfigurationPhase($urlRouterProvider, $locationProvider, $provide, $httpProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $urlRouterProvider.otherwise(function ($injector, $location, loginService, $state) {

            // Inject the custome lgoin authentication service which we need to check for authetication.
            var loginService = $injector.get("loginService");

            // Inject $state object, which we need to redirect purpose.
            var state = $injector.get('$state');

            if (loginService.isLoggedIn()) {
                state.go("base.dashboard");
            }
            else {
                state.go("login");
            }

        });

        $httpProvider.interceptors.push('AuthInterceptor');

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


    function authenticationHandler($rootScope, $state, loginService) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            if (toState.authenticate && !loginService.isLoggedIn()) {
                console.log("If " + loginService.isLoggedIn())
                $state.transitionTo("login");
                event.preventDefault();
            }

            // For accessing login url directly after user already in login sate.
            if (toState.chkAuthenticat && loginService.isLoggedIn()) {

                $state.transitionTo("base.dashboard");
                event.preventDefault();
            }
        });
    }

})();
