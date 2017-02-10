angular.module('customAlert.directive', [])
    .directive("customAlert", customAlert);

function customAlert($window) {
    var i = 0;
    return {
        restrict: 'A',
        priority: 1,
        compile: function (tElem, tAttrs) {
            var fn = '$$customAlert' + i++,
                _ngClick = tAttrs.ngClick;
            tAttrs.ngClick = fn + '($event)';

            return function (scope, elem, attrs) {
                var confirmMsg = attrs.customAlert || 'Are you sure?';

                scope[fn] = function (event) {
                    if ($window.confirm(confirmMsg)) {
                        scope.$eval(_ngClick, { $event: event });
                    }
                };
            };
        }
    };
}
