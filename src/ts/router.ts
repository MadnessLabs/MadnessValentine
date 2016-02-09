/// <reference path="../tsd/tsd.d.ts"/>
module MadnessValentine {
    'use strict';

    class MadnessValentineRouter {
        constructor($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('map', {'url':'/map', 
'templateUrl':'html/page/map.html', 
'controller':'MadnessValentine.MapController as ctrl'});

            $urlRouterProvider.otherwise(function($injector, $location) {
                var $state = $injector.get('$state');
                $state.go('map');
            });
        }
    }

    angular.module('MadnessValentine')
           .config(MadnessValentineRouter);
}