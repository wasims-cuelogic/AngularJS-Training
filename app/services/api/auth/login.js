angular.module('login.service', [])
    .factory('loginService',
    ['$q', '$timeout', '$http', 'dashboardService',
        function ($q, $timeout, $http, dashboardService) {

            // create user list            
            var userList = dashboardService.getUserList().userDetails;

            function login(username, password) {

                console.log("Users LIst "+JSON.stringify(userList));
                
                return;

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/user/login',
                    { username: username, password: password })
                    // handle success
                    .success(function (data, status) {
                        if (status === 200 && data.status) {
                            user = true;
                            deferred.resolve();
                        } else {
                            user = false;
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function (err) {
                        console.log("In Service " + err)
                        user = false;
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }



            // return available functions for use in the controllers
            return ({
                login: login
            });

        }]);