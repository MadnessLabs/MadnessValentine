/// <reference path="../tsd/tsd.d.ts"/>

declare var ionic;

module MadnessValentine {
    'use strict';

    class AppRunner {
        constructor(
            $ionicPlatform, 
            $cordovaSplashscreen,
            $rootScope,
            $ionicLoading,
            $cordovaKeyboard
        ) {
            $ionicPlatform.ready(function() {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }

                if (window.cordova) {
                    $cordovaSplashscreen.hide();

                    $rootScope.$watch(function() {
                        return $cordovaKeyboard.isVisible();
                    }, function(value) {
                        $rootScope.keyboardOpen = value;
                    });
                }

                $rootScope.$on('loading:show', function() {
                    $ionicLoading.show({ template: '<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner>' });
                });

                $rootScope.$on('loading:hide', function() {
                    $ionicLoading.hide();
                });

            });
        }
    }
    angular.module('MadnessValentine').run(AppRunner);
}