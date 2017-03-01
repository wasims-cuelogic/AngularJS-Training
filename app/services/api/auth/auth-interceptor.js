'use strict';

angular
    .module('AuthInterceptor.service', [])
    .factory('AuthInterceptor', ['$rootScope', 'localStorageServiceWrapper', AuthInterceptor]);

function AuthInterceptor($rootScope, localStorageServiceWrapper) {

    var service = {};

    service.request = function (config) {

        var currentUser = localStorageServiceWrapper.get('user'),
            access_token = currentUser ? 'Bearer ' + currentUser.id : null;

        if (access_token) {

            config.headers.authorization = access_token;
            $rootScope.$broadcast('authorized');
        }

        return config;
    };
    service.responseError = function (response) {
        if (response.status === 401) {
            $rootScope.$broadcast('unauthorized');
        }
        return response;
    };

    return service;
}    