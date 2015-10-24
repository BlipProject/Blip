'use strict';

angular.module('blipApp')
	.factory('GeoLocationService', function () {
		return {
			getGeoCoordinates: function(){
				var geoData ={};
				var positionOptions = {
				  enableHighAccuracy: true,
				  timeout: 1000,
				  maximumAge: 500
				};

				if (navigator.geolocation) {
				    navigator.geolocation.getCurrentPosition(function(position,positionOptions){
			        	position = position;
				        geoData = {
				        	longitude : position.coords.longitude,
				        	latitude : position.coords.latitude
			        	};
			        	//?? Unreachable code Uhhh??
					});
			    }
			    return geoData;
			}
		};
	});
