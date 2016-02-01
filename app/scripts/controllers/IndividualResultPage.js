'use strict';

angular.module('blipApp')
    .controller('IndividualResultPageCtrl', ['ResultPageState', '$scope','uiGmapGoogleMapApi', function(ResultPageState, $scope) {

    	$scope.pageViewData = ResultPageState.GetPageState();

    }])
    .directive('watchLocation',['ResultPageState', function(ResultPageState) {

    	//Stores data pulled from the 'ResultPageState' factory
    	var pageViewData = ResultPageState.GetPageState();
    	console.log("Lontitude (Venue) = " + pageViewData.MapLong);
    	console.log("Latitude Lontitude (Venue) = " + pageViewData.MapLat);

  		return {
    		restrict: 'E',
    		replace: true,
    		scope: true,

			link:function(scope, element, attributes){

				function geo_error() {
				  alert("Sorry, no position available.");
				}

				var geo_options = {
				  enableHighAccuracy: true, 
				  maximumAge        : 10000, 
				  timeout           : 27000
				};

    			if (navigator.geolocation) {
			        navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
			    } else {
			        // Error, Browser not supported
			    }
			    


			    function geo_success(position) {

			    	var coordinatesUser = {lat: position.coords.latitude, lng: position.coords.longitude};
			    	var coordinatesVenue = {lat: parseFloat(pageViewData.MapLat), lng: parseFloat(pageViewData.MapLong)};

			    	//Stores distance to venue from current position
			    	var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(coordinatesUser.lat,coordinatesUser.lng), new google.maps.LatLng(coordinatesVenue.lat,coordinatesVenue.lng));
			    	//Stores heading from markerUser to marker venue
				  	var headingVenue = google.maps.geometry.spherical.computeHeading(new google.maps.LatLng(coordinatesUser.lat,coordinatesUser.lng), new google.maps.LatLng(coordinatesVenue.lat,coordinatesVenue.lng));
			  		//Stores heading for the users current position
				  	var userHeading = position.coords.heading;

				    var mapDiv = document.getElementById('map');
				    var map = new google.maps.Map(mapDiv, {
				      center: {lat: position.coords.latitude, lng: position.coords.longitude},
				      disableDefaultUI: true,
				      draggable: false,
				      scrollwheel: false,
				      zoom: 17
				    });

				    //TODO: Will set custom icon for markerUser
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
					    title: 'You Are Here'
				  	});

				    //Set markerUser towards heading of markerVenue
				    markerUser.setIcon({
				    	path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
				    	scale:9,
				    	rotation: userHeading,
				    });

				    //Sets venue position
				  	var markerVenue = new google.maps.Marker({
					    position: coordinatesVenue,
					    map: map,
					    title: pageViewData.LocationName,
					    animation: google.maps.Animation.BOUNCE
				  	});

				  	//TODO: Remove as only for visual purposes
				  	//Set pollyline between markers
					var direction = new google.maps.Polyline({
				  		path: [coordinatesUser,coordinatesVenue],
				  		geodesic: true,
					    strokeColor: '#FF0000',
					    strokeOpacity: 1.0,
					    strokeWeight: 2
				  	});
				  	direction.setMap(map);


				  	var x = document.getElementById("testDistance");
				  	x.innerHTML = "Distance = " + distance;
				  	
				  	console.log("User Heading = " + userHeading);
			  		console.log("Venue Heading = " + headingVenue);
				  	console.log("Distance (m) = " + distance);
				    console.log("Longitude (User) = " + position.coords.longitude);
				    console.log("Latitude (User) = " + position.coords.latitude);
				}		    
    		}

    	}
  	}]);