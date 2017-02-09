(function () {

    'use strict';

    angular
        .module('dashboard')
        .controller('dashboardController', ['$scope', '$state', 'dashboardService', 'employeeService', dashboardController])
        .directive('confirmClick', function ($window) {
            var i = 0;
            return {
                restrict: 'A',
                priority: 1,
                compile: function (tElem, tAttrs) {
                    var fn = '$$confirmClick' + i++,
                        _ngClick = tAttrs.ngClick;
                    tAttrs.ngClick = fn + '($event)';

                    return function (scope, elem, attrs) {
                        var confirmMsg = attrs.confirmClick || 'Are you sure?';

                        scope[fn] = function (event) {
                            if ($window.confirm(confirmMsg)) {
                                scope.$eval(_ngClick, { $event: event });
                            }
                        };
                    };
                }
            };
        })

    function dashboardController($scope, $state, dashboardService, employeeService) {
        $scope.blackSpinner = 'resource/images/blackSpinner.gif';

        var gender_order = {
            female: 1,
            male: 2
        };

        $scope.order = {
            field: 'name',
            reverse: false
        };

        $scope.reverseOrder = true;

        $scope.dynamicOrder = function (user) {
            var order = 0;
            switch ($scope.order.field) {
                case 'gender':
                    order = gender_order[user.gender];
                    break;
                default:
                    order = user[$scope.order.field];
            }

            return order;
        }

        $scope.userList = function () {
            //calling API and get user list
            $scope.getUsers = employeeService.getEmployeeList().userDetails;
            $scope.subTabMenus = [{
                'tabMenu': 'All',
                'action': 'dashboard'
            }, {
                'tabMenu': 'Proposals',
                'action': 'proposals'
            }]
        };

        $scope.editUser = function (userId) {
            $state.go('base.edit', { id: userId });
        };

        $scope.deleteEmployee = function (userId) {
            employeeService.deleteEmployee(userId)
                .then(function (user) {
                    $state.go('base.dashboard');
                });
        }
    }

})();
