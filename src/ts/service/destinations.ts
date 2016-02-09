/// <reference path='../../tsd/tsd.d.ts'/>

module MadnessValentine {
    class DestinationFactory {

    	destinations: any;

        constructor(protected $http: any, protected $q: any, protected $httpParamSerializer, protected $rootScope) {
            // On Load
            this.destinations = [
				{
					name: 'Luscious Blossoms',
					hint: 'Though it\'s not the typical arrangement it says I love you berry much.',
					answer: 'Edible Arrangements',
					lat: 38.437956,
					lng: -90.382641
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