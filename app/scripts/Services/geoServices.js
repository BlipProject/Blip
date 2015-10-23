'use strict';

angular.module('blipApp')
	.factory('GeoLocationService', function () {
		return {
			getGeoCoordinates: function(){
				var data={};
				var positionOptions = {
				  enableHighAccuracy: true,
				  timeout: 1000,
				  maximumAge: 500
				};

				if (navigator.geolocation) {
				    navigator.geolocation.getCurrentPosition(function(position,positionOptions){
				        	position = position;
					        data = {
					        	longitude : position.coords.longitude,
					        	latitude : position.coords.latitude
				        };
					});
			    }
			    return data;
			}
		};
	});
