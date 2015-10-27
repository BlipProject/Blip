'use strict';

angular.module('blipApp')
	
	.controller('MapCtrl', ['$http','$scope', 'uiGmapGoogleMapApi', 'uiGmapIsReady', function ($http,$scope,uiGmapGoogleMapApi, uiGmapIsReady) {

		//Stores geolocation data to send to php script
		var data;
		//Store search result returned from server
		var searchResult = "";
		$scope.youarehere;
		$scope.map;

		
		$scope.getLocation = function(){
			var positionOptions = {
			  enableHighAccuracy: true,
			  timeout: 1000,
			  maximumAge: 500
			};

			if (navigator.geolocation) {
				console.log("got to getlocation function");
			    navigator.geolocation.getCurrentPosition(function(position,positionOptions){
					$scope.$apply(function(){
			        	$scope.position = position;
				        data = {
				        	longitude : position.coords.longitude,
				        	latitude : position.coords.latitude
				        };

			        	 getLocationResults(data);
			        	//alert(data.longitude + " " + data.latitude);
			    

			        	$scope.map = { 
							center: { latitude: data.latitude, longitude: data.longitude }, 
							options: $scope.mapOptions,
							zoom: 14 
						};

						$scope.mapOptions={

						};

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
						
						};

						    $scope.busmarker =  {
        					id: 5,
        					coords: {
            						latitude: data.latitude,
            						longitude: data.longitude
        							}
    						};
						
					});
			    });
			}

			$scope.selectedmarker = {};


		$scope.onClick = function(data) {
			console.log("Got Here - onclick");
			$scope.selectedmarker = data;
			console.log($scope.selectedmarker);
			$scope.$apply();
		$scope.windowOptions.show = !$scope.windowOptions.show;
		$scope.$apply();
		};    

			$scope.markers = [];


		$scope.windowOptions = {
		    show: false
		};


		$scope.closeClick = function() {
		    $scope.windowOptions.show = false;
		};

		uiGmapIsReady.promise() // if no value is put in promise() it defaults to promise(1)
    .then(function (instances) {
        console.log(instances[0].map); // get the current map
    })
        .then(function () {
        $scope.addMarkerClickFunction($scope.markers);
    });

     

    $scope.addMarkerClickFunction = function (markers) {
        angular.forEach(markers, function (value, key) {
            value.onClick = function () {
                $scope.onClick(value);
                $scope.MapOptions.markers.selected = value;
            };
        });
    };

   

    $scope.MapOptions = {
        minZoom: 3,
        zoomControl: false,
        draggable: true,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        disableDoubleClickZoom: false,
        keyboardShortcuts: true,
        markers: {
            selected: {}
        },
        styles: [{
            featureType: "poi",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "transit",
            elementType: "all",
            stylers: [{
                visibility: "off"
            }]
        }],
    };


		};

		///////////
		//IMPORTANT Change post URL to reletive link before build... '../phpCore/search.php'
		///////////
		//TESTING URL http://localhost/blip/app/phpCore/search.php
		var getLocationResults = function(data){
			console.log("got here - getlocationresults function");
			var searchResults;
			var callSearch = $http.post('http://localhost/Blip/app/phpCore/search.php', data)
		        .success(function(data, status, headers, config)
		        {
		        	console.log(data);
		        	searchResults = data;
		        angular.forEach(data, function(value, key){
						var marker =  {
        					id: key,
        					coords: {
            					latitude: value.MapLat,
            					longitude: value.MapLong
        						},
        					options: {
                            	labelContent: value.LocationName,
                            	labelAnchor: '22 0',
                            	labelClass: 'marker-labels',
                            	labelVisible: true
                        	},
                        	data: 'here is the data'

        					};

        					$scope.markers.push(marker);
				});

		        console.log($scope.markers);


		        	$scope.filterSearchResult = searchResult;
				    console.log(status + ' - ' + "Success"); 
				    console.log(searchResult);  
		        })
		        .error(function(data, status, headers, config)
		        {
		            console.log(status + ' - ' + 'Error');
		        });

		};


		$scope.filterSearchResult = [];

		$scope.getFilter = function(filter){
			console.log("got to getfilter function");
			if(filter !== "All")
			{
				console.log("got here - filtering");
				$scope.filterSearchResult = [];
				angular.forEach(searchResult, function(value){
					if(value.CategoryName === filter)
					{
						$scope.filterSearchResult.push(value);
					}
				});

			}
			else
			{
				console.log("got here - unfiltered");
				$scope.filterSearchResult = searchResult;
				console.log(searchResult);//undefined?
				
			}

				// angular.forEach($scope.filterSearchResult, function(value){
				// console.log("got here");
				// console.log(value);
				// 		var marker =  {
    //     					id: value.LocationID,
    //     					coords: {
    //         					latitude: value.MapLat,
    //         					longitude: value.MapLong
    //     						}
    //     					};

    //     					console.log(marker);

    //     					$scope.markers.push(marker);

				// });

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

		

		$scope.$watch($scope.active, function() {
        return $scope.markers;

    }, function(newValue, oldValue) {
        console.log('markers changed in $watch');
        console.log($scope.markers);
    }, 
    true
);

		}]);

