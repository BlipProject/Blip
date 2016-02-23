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
			//IMPORTANT Change post URL to reletive link before build... '../phpCore/get_nationalities.php'
			///////////
			//TESTING URL http://localhost/blip/app/phpCore/get_nationalities.php

			getNationalities: function(data){
				return $http.post('../phpCore/get_nationalities.php', data)
				.then(function(response) {
					console.log("Success");
					return response.data;
				});
			}
		};
	}]);

	//TODO implement error checking