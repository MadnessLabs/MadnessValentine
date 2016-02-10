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
        guess: string;
        answered: boolean;
        correct: boolean;
        feedback: string;
        gameOver: boolean;
        questLength: number;

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
            this.gameOver = false;

            this.questLength = this.destinations.all().length;

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
            this.answered = false;
            this.guess = '';
        }

        closeQuest() {
            this.questModal.hide();
            this.answered = false;
        }

        openHelp() {
            this.helpModal.show();
        }

        closeHelp() {
            this.helpModal.hide();
        }

        travel() {
            this.closeQuest();
            this.currentSpot++;
            this.spot = this.destinations.get(this.currentSpot);

            if (this.currentSpot === this.questLength) {
                this.gameOver = true;
            }
        }

        submitGuess() {
            this.answered = true;
            if (this.guess.toLowerCase() === this.spot.answer.toLowerCase()) {
                this.correct = true;
                this.feedback = 'Correct! Proceed to quest-ination...';
                this.markMe(this.spot.lat, this.spot.lng);
                setTimeout(function(){
                    this.travel();
                }.bind(this), 5000);
            } else {
                this.feedback = 'Hint: ' + this.spot.wrong;
                this.correct = false;
            }
        }
    }

    angular.module('MadnessValentine')
        .controller('MadnessValentine.MapController', MapController);
}