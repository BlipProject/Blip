'use strict';

angular.module('blipApp')
	.service('GeoLocationService', function () {
		return{
			getGeoCoordinates: function(navigator){
				var data ={};
				var positionOptions = {
				  enableHighAccuracy: true,
				  timeout: 1000,
				  maximumAge: 500
				};

				if (navigator.geolocation) {
				    navigator.geolocation.watchPosition(function(position,positionOptions){
			        	position = position;
				        var geoData = {
				        	longitude : position.coords.longitude,
				        	latitude : position.coords.latitude
			        	};
			        	//?? Unreachable code Uhhh??
			        	console.log(geoData);
			        	return geoData;
					});
			    }
			}
		};
	});
