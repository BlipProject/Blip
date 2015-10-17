'use strict';

angular.module('blipApp')
	
	.controller('LocationSearchCtrl', ['$http','$scope', function ($http,$scope) {

		//Stores geolocation data to send to php script
		var data;
		//Store search result returned from server
		$scope.searchResult="";
		//Stores filtered data (Quick filter buttons)
		$scope.filterSearchResult = [];
		//Variable to set the number of results displayed initialy
		//Modify to show more/less results
		$scope.showAmountFilter = 30;
		
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
	            })
		        .error(function(data, status, headers, config)
		        {
		            console.log(status + ' - ' + 'Error');
		        });
		};

		//Called to return filtered content if butten is pressed on main UI
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
			}
			else
			{
				$scope.filterSearchResult = $scope.searchResult;
			}
		};


		$scope.typeHeadClass;
		//Set class for individual search locations based off location type
		$scope.setResultClass = function (classIn){
			switch(classIn)
			{
				case 'Bar':
				{
					$scope.typeHeadClass = "result-header-bar";
					return 'fa fa-glass fa-lg';
				}
				case 'Restaurant':
				{
					$scope.typeHeadClass = "result-header-restaurant";
					return 'fa fa-cutlery fa-lg';
				}
				case 'Supermarket':
				{
					$scope.typeHeadClass = "result-header-shop";
					return 'fa fa-shopping-cart fa-lg';
				}
				case 'Other':
				{
					$scope.typeHeadClass = "result-header-other";
					return "";
				}
				default:
				{
					return "";
				}
			}
		};
}]);

