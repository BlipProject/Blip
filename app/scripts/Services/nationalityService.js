'use strict';

//Inject "NationalityService" service into controller

//Call service --
//NationalityService.getGeoCoordinates(navigator).then(function(data){
	//Logic here
//});

//Variable data stores returned nationalities

angular.module('blipApp')
	.service('NationalityService',['$http', function ($http,data,$q) {
		return{

			///////////
			//IMPORTANT Change post URL to reletive link before build... '../phpCore/nationalities.json
			///////////
			//TESTING URL http://localhost/blip/app/phpCore/nationalities.json

			getNationalities: function(data){
				return $http.get('../phpCore/nationalities.json', data)
				.then(function(response) {
					return response.data;
				});
			}

		};
	}]);

	//TODO implement error checking