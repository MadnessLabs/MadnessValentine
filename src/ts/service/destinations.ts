/// <reference path='../../tsd/tsd.d.ts'/>

module MadnessValentine {
    class DestinationFactory {

    	destinations: any;

        constructor(protected $http: any, protected $q: any, protected $httpParamSerializer, protected $rootScope) {
            // On Load
            this.destinations = [
				{
					name: 'Luscious Blossoms',
					hint: `It's not the typical arrangement or even 
					the right plant, but it still says I love you berry much!`,
					answer: 'edible arrangements',
					wrong: 'Bouquets aren\'t usually edible',
					lat: 38.437956,
					lng: -90.382641
				},
				{
					name: 'Dress to Impress',
					hint: `Cinderella didn't have this store to shop at, but
					you always have a ball shopping here.`,
					answer: 'kohls',
					wrong: 'A friend could get us a discount',
					lat: 38.437975,
					lng: -90.3797349
				},
				{
					name: 'Dinner Dilema',
					hint: `Everything is bigger here, whether it's
					 the portions or the atmosphere.  This is one of 
					 your favorite fancy dining establishments, 
					 now hurry up and figire it out dinners at steak!`,
					answer: 'texas roadhouse',
					wrong: 'Hank has one on the road to his house',
					lat: 38.4394528,
					lng: -90.3820103
				},
				{
					name: 'Dessert Anyone?',
					hint: `This is a new favorite recommended by an artist`,
					answer: 'hot box cookies',
					wrong: 'Named after a stoner activity',
					lat: 38.6405936,
					lng: -90.2622758
				},
				{
					name: 'There\'s no place like...',
					hint: `All good things must come to an end even a
					Valentine's Day quest game.  I hope you had fun
					exploring Arnold and look forward to our ever-bright future. 
					Now it's time to click those heels so we can curl up and 
					watch a movie I have selected for us. I love you darling! <3`,
					answer: 'home',
					wrong: 'Really?!??!??!',
					lat: 38.4406856,
					lng: -90.3695122
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