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
				  timeout: 1000,
				  maximumAge: 500
				};
				if (navigator.geolocation) {
				    navigator.geolocation.getCurrentPosition(function(position,positionOptions){
				        deferred.resolve ({
				        	longitude : position.coords.longitude,
				        	latitude : position.coords.latitude
			        	});
					});
			    }
			    return deferred.promise;
			}
		};
	});
