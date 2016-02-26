'use strict';

angular.module('blipApp')
    .controller('IndividualResultPageCtrl', ['ResultPageState', '$scope', function(ResultPageState, $scope) {

    	$scope.pageViewData = ResultPageState.GetPageState();

    }])
    .directive('watchLocation',['ResultPageState', function(ResultPageState) {

    	//Stores data pulled from the 'ResultPageState' factory
    	var pageViewData = ResultPageState.GetPageState();

    	//Set correct icon for venue type
    	var venueIcon;
    	switch(pageViewData.CategoryName){
    		case "Bar":{
    			venueIcon = "/images/map_icons/bar_icon.png";
    			break;
    		}
    		case "Restaurant":{
    			venueIcon = "/images/map_icons/resturant_icon.png";
    			break;
    		}
    		case "Supermarket":{
    			venueIcon = "/images/map_icons/shopping_icon.png";
    			break;
    		}
    		case "Other":{
    			venueIcon = "/images/map_icons/other_icon.png";
    			break;
    		}

    	}

  		return {
    		restrict: 'E',
    		replace: true,
    		scope: true,

			link:function(scope, element, attributes){

				var map,
                currentPositionMarker,
                currentVenueMarker,
                mapCenter = new google.maps.LatLng(54.278234, -8.461709),
                distance,
                direction,
                userMarker,
                //venue heading
                heading;

                //var coordinatesVenue = {lat: parseFloat(pageViewData.MapLat), lng: parseFloat(pageViewData.MapLong)};
                var coordinatesVenue = {lat: parseFloat(pageViewData.MapLat), lng: parseFloat(pageViewData.MapLong)};

                //Check if mobile or desktop
                //Load appropriate map
            	if( screen.width <= 959 ) {
					$(document).ready(function() {
	                	initLocationProcedure();
	            	});
				}
				else {
					initializeMap('desktop');
				}

	            function initializeMap(type)
	            {
	            	if(type === 'mobile'){
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
	            	else if(type === 'desktop'){
	            		map = new google.maps.Map(document.getElementById('map'), {
		                   zoom: 10,
		                   center: mapCenter,
		                   mapTypeId: google.maps.MapTypeId.ROADMAP
		                 });

	            		//TODO: Implement this function
	            		//Need user imputted location first
	            		//setUserPositionDesktop(lat,lng);
	            		//getDistance(curLat,curLong);
		                setVenueLocation();
	            	}
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
	                console.log(pos);

	                //Initaly set Rotation, Distance, and Pillyline
	                setUserRotation(pos);
	                getDistance(pos.coords.latitude,pos.coords.longitude);
	            }

	            //Sets the map marker for venue
	            function setVenueLocation(){
	            	currentVenueMarker = new google.maps.Marker({
	                    map: map,
	                    position: coordinatesVenue,
	                    title: pageViewData.LocationName,
	                    icon: venueIcon
	                });
	            }

	            //Sets the rotation of the users heading
	            function setUserRotation(pos){
	            	var arrow = document.getElementById("userArrow");

	            	window.addEventListener('deviceorientation', function(event) {
	            		var currentHeading;
	            		var accuracy;
						if (event.webkitCompassHeading !== undefined) {
							// Direction values are measured in degrees starting at due north and continuing clockwise around the compass.
							// Thus, north is 0 degrees, east is 90 degrees, south is 180 degrees, and so on. A negative value indicates an invalid direction.
							currentHeading = (360 - event.webkitCompassHeading);
							accuracy = event.webkitCompassAccuracy;
						} else if (event.alpha != null) {
							// alpha returns the rotation of the device around the Z axis; that is, the number of degrees by which the device is being twisted
							// around the center of the screen
							// (support for android)
							currentHeading = (270 - event.alpha) * -1;
							accuracy = event.webkitCompassAccuracy;
						}

						arrow.style.transform = "rotate(" + currentHeading + "deg)";
					});
	            }

	            //Sets the rotation of the venue heading
	            function setRotation(){
	            	var arrow = document.getElementById("navArrow");
	                arrow.style.transform = "rotate(" + parseInt(heading) + "deg)";
	            }

	            //Gets and displays distance to location
	            //Refreshes on watchPoistion event
	            function getDistance(curLat,curLong){
	            	distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(curLat,curLong), new google.maps.LatLng(coordinatesVenue.lat,coordinatesVenue.lng));
	            	/*
	            	var x = document.getElementById("testDistance");
	            	x.innerHTML = "Distance To Venue : " + (distance/1000).toFixed(1) + "km";
	            	*/
	            }

	            function displayAndWatch(position) {
	                // set current position
	                setCurrentPosition(position);
	                // watch position
	                watchCurrentPosition();
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

	                heading =  google.maps.geometry.spherical.computeHeading(new google.maps.LatLng(position.coords.latitude,position.coords.longitude), new google.maps.LatLng(coordinatesVenue.lat,coordinatesVenue.lng));


					//Update Rotation, distance
					setUserRotation(position);
					setRotation();
	                getDistance(position.coords.latitude,position.coords.longitude);
	            }

	            function initLocationProcedure() {
	                initializeMap('mobile');

	                if (navigator.geolocation) {
	                    navigator.geolocation.getCurrentPosition(displayAndWatch, locError);
	                } else {
	                    alert("Your browser does not support the Geolocation API");
	                }
	            }


	            //Toggle controls for map -- mobile --

	            //Check if screen is less than 960px
	            //Hides map if on mobile screen
	            if($(window).width() < 960){
            		$('.indiv-map-wrap').hide();
	            }

            	//Temp variable to store current set class on map toggle button
	         	var setBtnClass = "";

				$("#btnToggleMap").click(function(){
					$('.indiv-map-wrap').slideToggle( 400, function() {});

					//Calls function to set toggle button and scroll
					if(setBtnClass === "btn-danger"){
						mapToggle('btn-danger','btn-success',0,"Get Directions")
					}
					else{
						mapToggle('btn-success','btn-danger',130,"Close Directions")
					}
				});

				//Sets class on toggle button [btn-danger/btn-success]
				//Sets scroll [0 == noramal, 145 == scrolled to top]
				//Initiates map
				function mapToggle(rClass,aClass,scroll,htmlMsg){
					$("#btnToggleMap").removeClass(rClass).addClass(aClass).html(htmlMsg);
						setBtnClass = aClass;

						$("html, body").animate({
			            	scrollTop: scroll
			        	}, 400);

			        	if(aClass === 'btn-danger')
			        	{
			        		setTimeout(function(){
						  		initLocationProcedure();
							}, 1000);
			        	}
			        	return false;
				}
			}
    	};
  	}]);