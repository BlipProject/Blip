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
                mapCenter = new google.maps.LatLng(54.278234, -8.461709),
                map,
                distance,
                direction,
                userMarker,
                heading;

                //var coordinatesVenue = {lat: parseFloat(pageViewData.MapLat), lng: parseFloat(pageViewData.MapLong)};
                var coordinatesVenue = {lat: parseFloat(pageViewData.MapLat), lng: parseFloat(pageViewData.MapLong)};
	            function initializeMap()
	            {
	                map = new google.maps.Map(document.getElementById('map'), {
	                   zoom: 16,
	                   center: mapCenter,
	                   disableDefaultUI: true,
	                   draggable: false,
	                   scrollwheel: false,
	                   mapTypeId: google.maps.MapTypeId.ROADMAP
	                 });

	                setVenueLocation();
	            }

	            function locError(error) {
	                // the current position could not be located
	                alert("The current position could not be found!");
	            }

	            function setCurrentPosition(pos) {
	                map.panTo(new google.maps.LatLng(
	                        pos.coords.latitude,
	                        pos.coords.longitude
	                    ));

	                
	                //Initaly set Rotation, Distance, and Pillyline
	                setUserRotation(pos);
	                getDistance(pos.coords.latitude,pos.coords.longitude);
	                setPollyLine({lat: pos.coords.latitude,lng: pos.coords.longitude});
	            }

	            //Sets the map marker for venue
	            function setVenueLocation(){
	            	currentVenueMarker = new google.maps.Marker({
	                    map: map,
	                    position: coordinatesVenue,
	                    title: pageViewData.LocationName
	                });
	            }

	            //Functions to set headings of UserMarker & Venue marker
	            function setUserRotation(pos){
	            	var arrow = document.getElementById("userArrow");
	                arrow.style.transform = "rotate(" + pos.coords.heading + "deg)";
	            };

	            function setRotation(){
	            	var arrow = document.getElementById("navArrow");
	                arrow.style.transform = "rotate(" + parseInt(heading) + "deg)";
	                var x = document.getElementById("testHeading");
	                x.innerHTML = heading;
	            }

	            function getDistance(curLat,curLong){
	            	distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(curLat,curLong), new google.maps.LatLng(coordinatesVenue.lat,coordinatesVenue.lng));
	            	var x = document.getElementById("testDistance");
	            	x.innerHTML = "Distance = " + distance;
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
					    strokeOpacity: 0.5,
					    strokeWeight: 1
				  	});
				  	direction.setMap(map);
	            }

	            function watchCurrentPosition() {
	                var positionTimer = navigator.geolocation.watchPosition(
	                    function (position) {
	                        setMarkerPosition(
	                            currentPositionMarker,
	                            position
	                        ),
	                        {'enableHighAccuracy':true,'timeout':10000,'maximumAge':20000};
	                    });
	            }

	            function setMarkerPosition(marker, position) {
	                map.panTo(new google.maps.LatLng(
	                        position.coords.latitude,
	                        position.coords.longitude
	                    ));

	                if(position.coords.heading != null)
	                	heading = position.coords.heading;

	                heading =  google.maps.geometry.spherical.computeHeading(new google.maps.LatLng(position.coords.latitude,position.coords.longitude), new google.maps.LatLng(coordinatesVenue.lat,coordinatesVenue.lng));
	                

					//Update Rotation, distance
					setUserRotation(position);
					setRotation();
					setPollyLine({lat: position.coords.latitude,lng: position.coords.longitude});
	                getDistance(position.coords.latitude,position.coords.longitude);
	            }

	            function initLocationProcedure() {
	                initializeMap();

	                var option = {
	                	maximumAge:0,
	                	timeout:10000,
	                	enableHighAccuracy: true
	                }

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