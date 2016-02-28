'use strict';

//Inject "SearchServices" service into controller

//Call service --
//SearchServices.getLocationResults([variable with coordinates]).then(function(data){
	//Logic here
//});

//Variable data stores returned searchreults

angular.module('blipApp')
	.service('SearchServices',['$http', function ($http,data,$q) {
		return{

			///////////
			//IMPORTANT Change post URL to reletive link before build... '../phpCore/search.php'
			///////////
			//TESTING URL http://localhost/blip/app/phpCore/search.php
			getLocationResults: function(data){
				return $http.post('http://localhost/blip/app/phpCore/search.php', data)
			        .then(function(response)
			        {
			        	var resultCache = {date: Date.now(), data:response.data};
			        	localStorage.cacheResults = JSON.stringify(resultCache);
			        	console.log(resultCache);
			        	return response.data;
		            });
			}
		};
	}]);


	//TODO implement error checking