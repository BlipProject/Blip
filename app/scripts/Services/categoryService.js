'use strict';

//Inject "CategoryService" service into controller

//Call service --
//CategoryService.getGeoCoordinates(navigator).then(function(data){
	//Logic here
//});

//Variable data stores returned nationalities

angular.module('blipApp')
	.factory('CategoryService',['$http', function ($http,data,$q) {
		return{

			///////////
			//IMPORTANT Change post URL to reletive link before build... '../phpCore/get_categories.php
			///////////
			//TESTING URL http://localhost/blip/app/phpCore/get_categories.php

			getCategories: function(data){
				return $http.post('http://localhost/blip/app/phpCore/get_categories.php', data)
				.then(function(response) {
					localStorage.cacheCat = JSON.stringify(response.data);
					return response.data;
				});
			}
		};
	}]);

	//TODO implement error checking