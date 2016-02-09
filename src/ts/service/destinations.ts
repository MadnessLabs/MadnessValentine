/// <reference path='../../tsd/tsd.d.ts'/>

module MadnessValentine {
    class DestinationFactory {

    	destinations: any;

        constructor(protected $http: any, protected $q: any, protected $httpParamSerializer, protected $rootScope) {
            // On Load
            this.destinations = [
				{
					name: 'Love is in Bloom',
					hint: 'Whether it\'s Valentine\'s or our wedding, this flowershop is unForgettable',
					lat: 38.347558,
					lng: -90.983403
				}, {
					name: 'Love at First Bite',
					hint: 'First date and I knew that I could come back here with you forever',
					lat: 38.558107,
					lng: -91.012088
				}, {
					name: 'Love is Straightforward',
					hint: 'I have never had a more amazing first date. Owl City, snow, and a girl curled in my lap',
					lat: 38.590108,
					lng: -90.976528
				}, {
					name: 'Love Buds',
					hint: 'Though it was a stressful time, we had fun and learned lessons',
					lat: 38.433605,
					lng: -90.956886
				}, {
					name: 'Love your Friends',
					hint: 'Former love drunk, current drunk, stand up guy, and forever a friend',
					lat: 38.351658,
					lng: -90.976509
				}, {
					name: 'Love will find you Home',
					hint: 'Every quest must come to the end, but love lives forever',
					lat: 38.187028,
					lng: -90.836334
				}
			];
        }

        all() {
			return this.destinations;
        }

		get(index) {
            return this.destinations[index];
        }
    }

    angular.module('MadnessValentine').service('destinations', DestinationFactory);
}