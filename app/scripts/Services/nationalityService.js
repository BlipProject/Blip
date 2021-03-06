'use strict';

//Inject "NationalityService" service into controller

//Call service --
//NationalityService.getGeoCoordinates(navigator).then(function(data){
	//Logic here
//});

//Variable data stores returned nationalities

angular.module('blipApp')
	.factory('NationalityService',['$http', function ($http,data,$q) {
		return{

			///////////
			//IMPORTANT Change post URL to reletive link before build... '../phpCore/nationalities.json
			///////////
			//TESTING URL http://localhost/blip/app/phpCore/nationalities.json

			getNationalities: function(data){
				return $http.post('http://localhost/blip/app/phpCore/get_nationalities.php', data)
				.then(function(response) {
					localStorage.cacheNat = JSON.stringify(response.data);
					return response.data;
				});
			}
		};
	}]);

	//TODO implement error checking