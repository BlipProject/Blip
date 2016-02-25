'use strict';

//Inject "GeoLocationService" service into controller

//Call service --
//GeoLocationService.getGeoCoordinates(navigator).then(function(data){
	//Logic here
//});

//Variable data stores returned coordinates

angular.module('blipApp')
	.service('GeoLocationService', function ($q) {
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
					},function (error) {
						//If error return code to front end
        				deferred.reject(error);
    				});
			    }

			    return deferred.promise;
			}
		};
	});
