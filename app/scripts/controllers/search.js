'use strict';

angular.module('blipApp')
	
	.controller('LocationSearchCtrl', ['$http','$scope', function ($http,$scope) {

		//Stores geolocation data to send to php script
		var data;
		//Store search result returned from server
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

		///////////
		//IMPORTANT Change post URL to reletive link before build... '../phpCore/search.php'
		///////////
		//TESTING URL http://localhost/blip/app/phpCore/search.php
		var getLocationResults = function(data){
			var callSearch = $http.post('http://localhost/blip/app/phpCore/search.php', data)
		        .success(function(data, status, headers, config)
		        {
		        	$scope.searchResult = data;
		        	$scope.filterSearchResult = $scope.searchResult;
				    console.log(status + ' - ' + "Success"); 
				    console.log($scope.searchResult);         
	            })
		        .error(function(data, status, headers, config)
		        {
		            console.log(status + ' - ' + 'Error');
		        });
		};


		$scope.filterSearchResult = [];

		$scope.getFilter = function(filter){
			if(filter !== "All")
			{
				$scope.filterSearchResult = [];
				angular.forEach($scope.searchResult, function(value){
					if(value.CategoryName === filter)
					{
						$scope.filterSearchResult.push(value);
					}
				});
				console.log($scope.filterSearchResult);
			}
			else
			{
				$scope.filterSearchResult = $scope.searchResult;
			}
		};
}]);

