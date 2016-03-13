'use strict';

//Inject "GeoLocationService" service into controller

//Call service --
//GeoLocationService.getGeoCoordinates(navigator).then(function(data){
	//Logic here
//});

//Variable data stores returned coordinates

angular.module('blipApp')
	.service('GeoLocationService', function ($q, $rootScope, $http) {
		return{
			getGeoCoordinates: function(navigator){
				var deferred = $q.defer();
				var positionOptions = {
				  enableHighAccuracy: true,
				  timeout: 5000,
				  maximumAge: 500
				};
				if (!navigator) {
		            deferred.reject(new Error("Geolocation is not supported"));
		        }
				else {
				    navigator.geolocation.getCurrentPosition(function(position,positionOptions,error){
				        deferred.resolve ({
				        	longitude : position.coords.longitude,
				        	latitude : position.coords.latitude
			        	});

			        	var latlng = {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)};

						var geocoder = new google.maps.Geocoder;
						geocoder.geocode({'location': latlng}, function(results, status) {
							results.forEach(function(res) {
								res.types.forEach(function(type){
									if(type == "country") {

										var userVisitedCountries;

										if($rootScope.userVisitedCookie != undefined) { 
											userVisitedCountries = $rootScope.userVisitedCookie.split("-"); 

											if($.inArray(res.address_components[0].short_name, userVisitedCountries) === -1) {
												var countries = $rootScope.userVisitedCookie + "-" + res.address_components[0].short_name;
												
												var data = {
													userID: parseInt($rootScope.userIdCookie),
													VisitedCountries: countries
												}

												var update = $http.post('http://localhost/blip/app/phpCore/update_visited_countries.php', data);
										        $rootScope.userVisitedCookie = countries;
											}
										}
										else { 
											var countries = res.address_components[0].short_name

											var data = {
													userID: parseInt($rootScope.userIdCookie),
													VisitedCountries: countries
												}

											var update = $http.post('http://localhost/blip/app/phpCore/update_visited_countries.php', data);
									        $rootScope.userVisitedCookie = countries;
										}
									}
								});
							});
						});
					},function (error) {
						//If error return code to front end
        				deferred.reject(error);
    				});
			    }

			    return deferred.promise;
			}
		};
	});
