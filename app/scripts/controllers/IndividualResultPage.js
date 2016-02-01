'use strict';

angular.module('blipApp')
    .controller('IndividualResultPageCtrl', ['ResultPageState', '$scope', function(ResultPageState, $scope) {

    	$scope.pageViewData = ResultPageState.GetPageState();

    }])
    .directive('watchLocation',['ResultPageState', function(ResultPageState) {

    	//Stores data pulled from the 'ResultPageState' factory
    	var pageViewData = ResultPageState.GetPageState();

  		return {
    		restrict: 'E',
    		replace: true,
    		scope: true,

			link:function(scope, element, attributes){

				var map,
                currentPositionMarker,
                currentVenueMarker,
                mapCenter = new google.maps.LatLng(40.700683, -73.925972),
                map,
                distance,
                direction;

                var coordinatesVenue = {lat: parseFloat(pageViewData.MapLat), lng: parseFloat(pageViewData.MapLong)};

	            function initializeMap()
	            {
	                map = new google.maps.Map(document.getElementById('map'), {
	                   zoom: 16,
	                   center: mapCenter,
	                   mapTypeId: google.maps.MapTypeId.ROADMAP
	                 });

	                setVenueLocation();
	            }

	            function locError(error) {
	                // the current position could not be located
	                alert("The current position could not be found!");
	            }

	            function setCurrentPosition(pos) {
	                currentPositionMarker = new google.maps.Marker({
	                    map: map,
	                    position: new google.maps.LatLng(
	                        pos.coords.latitude,
	                        pos.coords.longitude
	                    ),
	                    title: "Current Position"
	                });
	                map.panTo(new google.maps.LatLng(
	                        pos.coords.latitude,
	                        pos.coords.longitude
	                    ));

	                //Set Marker icon as Arrow
	                currentPositionMarker.setIcon({
				    	path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
				    	scale:9,
				    });

	                getDistance(pos.coords.latitude,pos.coords.longitude);

	                var newPos = {lat: pos.coords.latitude,lng: pos.coords.longitude};
	                setPollyLine(newPos);
	            }

	            //Sets the map marker for venue
	            function setVenueLocation(){
	            	currentVenueMarker = new google.maps.Marker({
	                    map: map,
	                    position: coordinatesVenue,
	                    title: pageViewData.LocationName
	                });
	            }

	            function getDistance(curLong,curLat){
	            	distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(curLong,curLat), new google.maps.LatLng(coordinatesVenue.lat,coordinatesVenue.lng));
	            	var x = document.getElementById("testDistance");
	            	x.innerHTML = "Distance = " + distance;
	            	console.log(distance);
	            }

	            function displayAndWatch(position) {
	                // set current position
	                setCurrentPosition(position);
	                // watch position
	                watchCurrentPosition();
	            }

	            //FOR VISUAL REASONS ONLY
	            //TO BE REMOVED
	            //Draws a line between the 2 locations
	            function setPollyLine(position){
	            	direction = new google.maps.Polyline({
				  		path: [position,coordinatesVenue],
				  		geodesic: true,
					    strokeColor: '#FF0000',
					    strokeOpacity: 1.0,
					    strokeWeight: 2
				  	});
				  	direction.setMap(map);
	            }

	            function watchCurrentPosition() {
	                var positionTimer = navigator.geolocation.watchPosition(
	                    function (position) {
	                        setMarkerPosition(
	                            currentPositionMarker,
	                            position
	                        );
	                    });
	            }

	            function setMarkerPosition(marker, position) {
	            	var icon = {
	            		path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
				    	scale:9,
				    	rotation: position.coords.heading
	            	}

	                marker.setPosition(
	                    new google.maps.LatLng(
	                        position.coords.latitude,
	                        position.coords.longitude)
	                );
	                marker.setIcon(icon);

	                var y = document.getElementById("testHeading");
	                y.innerHTML = "Heading = " + icon.rotation;

	                getDistance(position.coords.latitude,position.coords.longitude);
	            }

	            function initLocationProcedure() {
	                initializeMap();
	                if (navigator.geolocation) {
	                    navigator.geolocation.getCurrentPosition(displayAndWatch, locError);
	                } else {
	                    alert("Your browser does not support the Geolocation API");
	                }
	            }

	            $(document).ready(function() {
	                initLocationProcedure();
	            });
			}	
    	}
  	}]);