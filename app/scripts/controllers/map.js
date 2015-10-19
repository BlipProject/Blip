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
			        	//console.log(data);
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
							},
							options: {
                            labelContent: 'YOU ARE HERE',
                            labelAnchor: '22 0',
                            labelClass: 'marker-labels',
                            labelVisible: true
                        }
						
						}

						    $scope.busmarker =  {
        					id: 5,
        					coords: {
            						latitude: data.latitude,
            						longitude: data.longitude
        							},
        					data: 'newbusinesslocation',
    						};
						
					});
			    });
			}

			$scope.markers = [
    {
        id: 0,
        coords: {
            latitude: 54.274679,
            longitude: -8.471354,
            options: {
                            labelContent: 'Hardcoded location',
                            labelAnchor: '22 0',
                            labelClass: 'marker-labels',
                            labelVisible: true
                        }
        },
        data: 'random'
    },
    {
        id: 1,
        coords: {
            latitude: 53.354497,
            longitude:  -6.318959,
            options: {
                            labelContent: 'Hardcoded location',
                            labelAnchor: '22 0',
                            labelClass: 'marker-labels',
                            labelVisible: true
                        }
        },
        data: 'random'
    },
    {
        id: 2,
        coords: {
            latitude: 53.361545,
            longitude: -6.308740,
            options: {
                            labelContent: 'Hardcoded location',
                            labelAnchor: '22 0',
                            labelClass: 'marker-labels',
                            labelVisible: true
                        }
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
			var callSearch = $http.post('http://localhost/Blip/app/phpCore/search.php', data)
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
				angular.forEach($scope.filterSearchResult, function(value){
				console.log("got here");//not getting here - why????
				//console.log(value);
						var marker =  {
        					id: value.LocationID,
        					coords: {
            					latitude: value.Latitude,
            					longitude: value.Longitude
        						}
        					};

        					console.log(marker);

        					$scope.markers.push(marker);
				});

				console.log($scope.filterSearchResult);

			}
			else
			{
				$scope.filterSearchResult = $scope.searchResult;
				angular.forEach($scope.filterSearchResult, function(value){
				console.log("got here");//not getting here - why????
				console.log(value);
						var marker =  {
        					id: value.LocationID,
        					coords: {
            					latitude: value.MapLat,
            					longitude: value.MapLong
        						}
        					};

        					console.log(marker);

        					$scope.markers.push(marker);
				});
				
			}

			

		};



		uiGmapGoogleMapApi.then(function(maps) {

    });



//get latlng from address - for the business registration page
$scope.getCoordinates = function(){
  $scope.geodata = {};
  $scope.queryResults = {};
  $scope.queryError = {};
  $scope.address = document.getElementById('busaddress').value;
  console.log($scope.address);

  $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + 
            $scope.address + '&key=AIzaSyCn9zl42b2gnUt92A7v_OcAJB4OUem-zbM')
    .then(function(_results){
       console.log(_results.data);

       $scope.queryResults = _results.data.results;
       $scope.geodata = $scope.queryResults[0].geometry;

         var buslatlng = $scope.queryResults[0].geometry.location;
  		console.log(buslatlng);

  		$scope.busmarker =  {
        id: 5,
        coords: {
            latitude: buslatlng.lat,
            longitude: buslatlng.lng
        	},
        data: 'newbusinesslocation',
        animation: google.maps.Animation.DROP//not working
    	};


     }, 
     function error(_error){
        $scope.queryError = _error;
        console.log($scope.queryError);
     })

}

}]);

