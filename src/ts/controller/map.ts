/// <reference path='../../tsd/tsd.d.ts'/>

declare var google;

module MadnessValentine {
    'use strict';

    class MapController {

        questModal: any;
        helpModal: any;
        myLatlng: any;
        currentSpot: any;
        spot: any;
        map: any;

        constructor(
            protected Rest,
            protected enjin, 
            protected $ionicLoading, 
            protected $compile, 
            protected $cordovaGeolocation, 
            protected destinations,
            protected $ionicModal,
            protected $rootScope,
            $scope
        ) {
            // On Load
            this.myLatlng = '';
            this.currentSpot = 0;
            this.spot = this.destinations.get(this.currentSpot);

            this.$ionicModal.fromTemplateUrl('html/modal/quest.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                this.questModal = modal;
            }.bind(this));

            this.$ionicModal.fromTemplateUrl('html/modal/help.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                this.helpModal = modal;
            }.bind(this));


            this.$rootScope.$broadcast('loading:show');

            var posOptions = { timeout: 10000, enableHighAccuracy: false };

            $cordovaGeolocation.getCurrentPosition(posOptions).then(function(pos) {
                var myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

                var mapOptions = {
                    center: myLatlng,
                    zoom: 16,
                    mapyTpeId: google.maps.MapTypeId.ROADMAP
                };

                this.map = new google.maps.Map(document.getElementById('map'),
                    mapOptions);

                this.markMe(pos.coords.latitude, pos.coords.longitude);

                this.openHelp();
            }.bind(this), function(error) {
                console.log('Error Getting Location: ' + error.message);
                this.$rootScope.$broadcast('loading:hide');
            }.bind(this));
        }            

        centerOnMe() {
            if (!this.map) {
                return;
            }

            this.$rootScope.$broadcast('loading:show');

            var posOptions = { timeout: 10000, enableHighAccuracy: false };

            this.$cordovaGeolocation.getCurrentPosition(posOptions).then(function(pos) {
                this.markMe(pos.coords.latitude, pos.coords.longitude);
            }.bind(this), function(error) {
                console.log('Error Getting Location: ' + error.message);
                this.$rootScope.$broadcast('loading:hide');
            }.bind(this));
        }

        markMe(lat, lng) {
            var me = new google.maps.LatLng(lat, lng);

            this.map.setCenter(me);

            var marker = new google.maps.Marker({
                position: me,
                map: this.map,
                title: 'You Are Here!'
            });

            this.$rootScope.$broadcast('loading:hide');
        }

        openQuest() {
            this.questModal.show();
        }

        closeQuest() {
            this.questModal.hide();
        }

        openHelp() {
            this.helpModal.show();
        }

        closeHelp() {
            this.helpModal.hide();
        }

        travel() {
            this.markMe(this.spot.lat, this.spot.lng);
            this.closeQuest();
            this.currentSpot++;
            this.spot = this.destinations.get(this.currentSpot);

            if (this.currentSpot === 6) {
                angular.element(document.getElementsByClassName('ion-navicon-round')).hide();
            }
        }
    }

    angular.module('MadnessValentine')
        .controller('MadnessValentine.MapController', MapController);
}