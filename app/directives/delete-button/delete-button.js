angular.module('deleteButton.directive', [])
    .directive("deleteButton", deleteButton);

function deleteButton($compile) {
    return {
        restrict: 'E',
        scope: {
            buttonValue: '=',
            disabledButton: '=',
            deleteMultipleEmp: '&'
        },
        template: '<input type="button" value="{{buttonValue}}" \
                        class="btn btn-primary radius expand delete-btn" ng-disabled="disabledButton" ng-click="deleteMultipleEmp()">',
        link: function (scope, element, attrs) {
            element.bind('click', function () {                
                
            });
        }
    };
}
