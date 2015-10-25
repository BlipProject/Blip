'use strict';

angular.module('blipApp')
	.service('SearchServices',['$http', function ($http,data) {
		///////////
		//IMPORTANT Change post URL to reletive link before build... '../phpCore/search.php'
		///////////
		//TESTING URL http://localhost/blip/app/phpCore/search.php
		var searchResults;
		this.getLocationResults = function(data){
			var callSearch = $http.post('http://localhost/blip/app/phpCore/search.php', data)
		        .success(function(data, status, headers, config)
		        {
		        	console.log(status + ' - ' + "Success");
		        	console.log(data);
		        	searchResults = data; 
		        	return searchResults;     
	            })
		        .error(function(data, status, headers, config)
		        {
		            console.log(status + ' - ' + 'Error');
		        });
		};
		
	}]);