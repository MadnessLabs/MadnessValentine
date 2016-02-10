/// <reference path='../../tsd/tsd.d.ts'/>

module MadnessValentine {
    class DestinationFactory {

    	destinations: any;

        constructor(protected $http: any, protected $q: any, protected $httpParamSerializer, protected $rootScope) {
            // On Load
            this.destinations = [
				{
					name: 'Luscious Blossoms',
					hint: `It\'s not the typical arrangement or even 
					the right plant, but it still says I love you berry much!`,
					answer: 'edible arrangements',
					wrong: 'Bouquets aren\'t usually edible',
					lat: 38.437956,
					lng: -90.382641
				},
				{
					name: 'Dinner Dilema',
					hint: `Everything is bigger here, whether it\'s
					 the portions or the atmosphere.  This is one of 
					 your favorite fancy dining establishments, 
					 now hurry up and figire it out dinners at steak!`,
					answer: 'texas roadhouse',
					wrong: 'Hank has one on the road to his house',
					lat: 38.4394528,
					lng: -90.3820103
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