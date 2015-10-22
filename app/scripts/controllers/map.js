'use strict';

angular.module('blipApp')
	
	.controller('MapCtrl', ['$http','$scope', 'uiGmapGoogleMapApi', function ($http,$scope,uiGmapGoogleMapApi) {

		//Stores geolocation data to send to php script
		var data;
		//Store search result returned from server
		$scope.searchResult;
		$scope.youarehere;
		$scope.map;
		$scope.markers = [];
		
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

			        	$scope.map = { 
							center: { latitude: data.latitude, longitude: data.longitude }, 
							zoom: 14 
						}

						$scope.youarehere = {
							id: 1,
							coords: {
								latitude: data.latitude,
								longitude: data.longitude
							}
						
						}

						    $scope.busmarker =  {
        					id: 5,
        					coords: {
            						latitude: data.latitude,
            						longitude: data.longitude
        							},
        					data: 'newbusinesslocation',
       	 					animation: google.maps.Animation.DROP//not working
    						};
						
					});
			    });
			}


			$scope.markers = [
    {
        id: 0,
        coords: {
            latitude: 54.274679,
            longitude: -8.471354
        },
        data: 'random'
    },
    {
        id: 1,
        coords: {
            latitude: 53.354497,
            longitude:  -6.318959
        },
        data: 'random'
    },
    {
        id: 2,
        coords: {
            latitude: 53.361545,
            longitude: -6.308740
        },
        data: 'random'
    }
];

		$scope.addMarkerClickFunction = function(markersArray){
		    angular.forEach(markersArray, function(value, key) {
		        value.onClick = function(){
		                $scope.onClick(value.data);
		            };
		    });

		}; 

		$scope.windowOptions = {
		    show: false
		};

		$scope.onClick = function(data) {
		    $scope.windowOptions.show = !$scope.windowOptions.show;
		    console.log('$scope.windowOptions.show: ', $scope.windowOptions.show);
		    console.log('This is a ' + data);
		};

		$scope.closeClick = function() {
		    $scope.windowOptions.show = false;
		};


		};

		///////////
		//IMPORTANT Change post URL to reletive link before build... '../phpCore/search.php'
		///////////
		//TESTING URL http://localhost/blip/app/phpCore/search.php
		var getLocationResults = function(data){
			var callSearch = $http.post('../phpCore/search.php', data)
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

						//something like this to create a marker for each filtered result???
						// var mrk = {
		//   					id: This.value,
		//   						coords: {
		//       					latitude: this.value.latitude,
		//       					longitude: this.value.longitude
		//   						}
		//   					}
								//$scope.markers.push(mrk);
					}
				});
				console.log($scope.filterSearchResult);
			}
			else
			{
				$scope.filterSearchResult = $scope.searchResult;
			}
		};



		uiGmapGoogleMapApi.then(function(maps) {

		});
		}]);

