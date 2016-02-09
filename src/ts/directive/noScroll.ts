/// <reference path='../../tsd/tsd.d.ts'/>

angular.module('MadnessValentine').directive('noScroll', function($document) {
    return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
            $document.on('touchmove', function(e) {
                e.preventDefault();
            });
        }
    };
});
