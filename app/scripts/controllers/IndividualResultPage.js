'use strict';

angular.module('blipApp')
    .controller('IndividualResultPageCtrl', ['ResultPageState', '$scope','uiGmapGoogleMapApi', function(ResultPageState, $scope) {

    	$scope.pageViewData = ResultPageState.GetPageState();

    }])
    .directive('watchLocation',['ResultPageState', function(ResultPageState) {

    	//Stores data pulled from the 'ResultPageState' factory
    	var pageViewData = ResultPageState.GetPageState();
    	console.log(pageViewData.MapLong + " Lontitude (Venue)");
    	console.log(pageViewData.MapLat + " Latitude Lontitude (Venue)");

  		return {
    		restrict: 'E',
    		replace: true,
    		scope: true,

			link:function(scope, element, attributes){

    			if (navigator.geolocation) {
			        navigator.geolocation.watchPosition(initMap);
			    } else {
			        // Error, Browser not supported
			    }
			    
			    function initMap(position) {

			    	var coordinatesUser = {lat: position.coords.latitude, lng: position.coords.longitude};
			    	var coordinatesVenue = {lat: parseFloat(pageViewData.MapLat), lng: parseFloat(pageViewData.MapLong)};

			    	var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(coordinatesUser.lat,coordinatesUser.lng), new google.maps.LatLng(coordinatesVenue.lat,coordinatesVenue.lng));
				  	var heading = google.maps.geometry.spherical.computeHeading(new google.maps.LatLng(coordinatesUser.lat,coordinatesUser.lng), new google.maps.LatLng(coordinatesVenue.lat,coordinatesVenue.lng));

				    var mapDiv = document.getElementById('map');
				    var map = new google.maps.Map(mapDiv, {
				      center: {lat: position.coords.latitude +0.010, lng: position.coords.longitude},
				      zoom: 14,
				    });
				    /*
				    var navArrow = {
					    url: '/images/navigationArrow.png',
					    size: new google.maps.Size(256,256),
					    // The origin for this image is (0, 0).
					    origin: new google.maps.Point(128,256),
					    // The anchor for this image is the base of the flagpole at (0, 32).
					    anchor: new google.maps.Point(100, 100),
					    rotation: heading,
					};
					*/
				    //Set users current position
				    var markerUser = new google.maps.Marker({
					    position: coordinatesUser,
					    map: map,
					    icon: "/images/navigationArrow.png",
					    title: 'You Are Here'
				  	});

				    markerUser.setIcon({
				    	path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
				    	scale:6,
				    	rotation: heading,
				    });

				    //Sets venue position
				  	var markerVenue = new google.maps.Marker({
					    position: coordinatesVenue,
					    map: map,
					    title: pageViewData.LocationName,
					    animation: google.maps.Animation.BOUNCE
				  	});

				  	//Set pollyline between markers
					var direction = new google.maps.Polyline({
				  		path: [coordinatesUser,coordinatesVenue],
				  		geodesic: true,
					    strokeColor: '#FF0000',
					    strokeOpacity: 1.0,
					    strokeWeight: 2
				  	});
				  	direction.setMap(map);

				  	//Returns distance to venue
				  	

			  		console.log(heading + " Heading");
				  	console.log(distance + " Distance (m)");
				    console.log(position.coords.longitude + " Longitude (User)");
				    console.log(position.coords.latitude + " Latitude (User)");
				}		    
    		}

    	}
  	}]);