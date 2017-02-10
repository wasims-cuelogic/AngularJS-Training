angular.module('submitButton.directive', [])
    .directive("submitButton", submitButton);

function submitButton($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {

            var clickAction = attr.submitAction;
            element.bind('click', function (event) {
                if (scope.userForm.$valid) {
                    scope.submitBtnTxt = "Saving...";
                    scope.$eval(clickAction);                    
                    //element.attr('disabled', 'disabled');                    
                }
            });
        }
    };
}
