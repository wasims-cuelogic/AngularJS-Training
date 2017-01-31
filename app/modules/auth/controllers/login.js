'use strict';

(function() {

    angular
        .module('auth')
        .controller('loginController', ['$scope', '$state', loginController]);

    function loginController($scope, $state) {
        console.log("Inside login controller");
    }

})();
