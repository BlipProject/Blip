'use strict';

angular.module('blipApp')
	
	.controller('LocationSearchCtrl', ['$http','$scope','$timeout', function ($http,$scope,$timeout) {

		//Stores geolocation data to send to php script
		var data;
		//Store search result returned from server
		//var searchResult;
		$scope.searchResult;
		
		$scope.getLocation = function(){

			var positionOptions = {
			  enableHighAccuracy: true,
			  timeout: 1000,
			  maximumAge: 500
			};

			if (navigator.geolocation) {
			    navigator.geolocation.getCurrentPosition(function(position,positionOptions){
					$scope.$apply(function(){
			        	$scope.position = position;
				        data = {
				        	longitude : position.coords.longitude,
				        	latitude : position.coords.latitude
				        };
			        	getLocationResults(data);
			        	console.log(data);
			        	//alert(data.longitude + " " + data.latitude);
					});
			    });
			}
		};


		//TODO Change post URL to reletive link ... ../phpCore/search.php
		var getLocationResults = function(data){
			var callSearch = $http.post('http://localhost/blip/app/phpCore/search.php', data)
		        .success(function(data, status, headers, config)
		        {
		        	$scope.searchResult = data;
				    console.log(status + ' - ' + "Success");          
	            })
		        .error(function(data, status, headers, config)
		        {
		            console.log(status + ' - ' + 'Error');
		        });
		};
}]);

