angular
    .module('login.service', [])
    .factory('loginService', ['$q','credentials', loginService]);

function loginService($q, credentials) {
    // create user list            
    var userList = credentials.credential;

    // create user variable
    var user = null;

    function login(username, password) {

        // create a new instance of deferred
        var deferred = $q.defer();

        var userExists = false;

        angular.forEach(userList, function (value, key) {
            if (!userExists && value.email === username && value.password === password) {
                userExists = true;
                user = userList[key];
            }
        });

        if (userExists) {
            deferred.resolve(user);
        }
        else {
            deferred.reject("Invalid username and/or password");
        }

        // return promise object
        return deferred.promise;
    }



    // return available functions for use in the controllers
    return ({
        login: login
    });
}