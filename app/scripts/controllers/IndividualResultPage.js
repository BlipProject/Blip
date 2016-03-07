'use strict';

angular.module('blipApp')
    .controller('IndividualResultPageCtrl', ['ResultPageState', '$scope','$anchorScroll','$location', function(ResultPageState, $scope, $anchorScroll, $location) {

    	$scope.pageViewData = ResultPageState.GetPageState();
    	console.log($scope.pageViewData);
    	//$scope.editLocation = ResultPageState.GetEditState();
    	$scope.editLocation = true;
    	$scope.uploader;

    	$scope.cancelModal = function() {
    		$(".modal").modal('hide');
    	};

    	$scope.editLocationName = function(update, name) {

    		if(update == true) {
    			$scope.pageViewData.LocationName = name;
    			$("#textBoxModal").modal('hide');
    		}
    		else {
    			$("#textBoxModal").modal('show');
    			$scope.tbxModal = $scope.pageViewData.LocationName;
    		}
    	};

    	$scope.editLocationImage = function(update) {

    		console.log($scope.pageViewData.LocationID);
    		if(update == true) {
    			$("#imageModal").modal('hide');
    		}
    		else {
    			$("#imageModal").modal('show');
    		}
    	};

    	$scope.editLocationImageUpload = function() {

    		$("#hiddenImgInput").trigger('click');

    		$("#hiddenImgInput").change(function() {

    			if(this.files && this.files[0]) {
				$("#editImageHolder").removeClass("hide");
				var reader = new FileReader();

    				reader.onload = function(e) {
    					$scope.pageViewData.LocationPic = e.target.result
    					$scope.$apply();
    				}
    				reader.readAsDataURL(this.files[0]);
				};
    		});
    	};

    	$scope.scrollTo = function(id) {
			$location.hash(id);
			$anchorScroll();
		}

    }])
    .directive('watchLocation',['ResultPageState', function(ResultPageState) {
		return {
    		restrict: 'E',
    		replace: true,
    		scope: true,

			link:function(scope, element, attributes){

				//Stores data pulled from the 'ResultPageState' factory
		    	var pageViewData = ResultPageState.GetPageState();

		    	//Set correct icon for venue type
		    	var venueIcon;
		    	function setMarkerStyle(){
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
			    }

				var map,
                currentPositionMarker,
                currentVenueMarker,
                mapCenter = new google.maps.LatLng(54.278234, -8.461709),
                distance,
                direction,
                userMarker,
                //venue heading
                heading;

                var coordinatesVenue = {lat: parseFloat(pageViewData.MapLat), lng: parseFloat(pageViewData.MapLong)};


                //Check if mobile or desktop
                //Load appropriate map
            	if( screen.width <= 959 ) {
					$(document).ready(function() {
	                	initLocationProcedure();
	            	});
				}
				else {
					setMarkerStyle();
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
		                   zoom: 14,
		                   center: coordinatesVenue,
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
	            //Source: https://mobiforge.com/design-development/html5-mobile-web-device-orientation-events
	            //Sets the rotation of the users heading
	            //Source: https://mobiforge.com/design-development/html5-mobile-web-device-orientation-events
	            function setUserRotation(pos){
	            	var arrow = document.getElementById("userArrow");

	            	//Source: http://developers.arcgis.com/javascript/sandbox/sandbox.html?sample=mobile_compass

	            	window.addEventListener('deviceorientation', function(event) {
	            		var alpha;
	            		var webkitAlpha;

	            		if(event.webkitCompassHeading){
	            			alpha = event.webkitCompassHeading;
	            			//IOS
	            			arrow.style.webkitTransform = "rotate(" + alpha + "deg)";
	            		}
	            		else{
            				alpha = event.alpha;

            				webkitAlpha = alpha;
            				if(!window.chrome)
            					webkitAlpha = alpha;

            				if (alpha > 180) {
						      alpha = 360 - alpha
						    }
						    else {
						      alpha = 0 - alpha
						    }

	            			webkitAlpha = alpha;
							arrow.style.transform = "rotate(" + alpha + "deg)";
							arrow.style.webkitTransform = "rotate(" + alpha + "deg)";
							//Firefox
							arrow.style.mozTransform = "rotate(" + alpha + "deg)"
        				}
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
	            	var x = document.getElementById("testDistance");
	            	x.innerHTML = "Distance To Venue : " + (distance/1000).toFixed(1) + "km";
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


	            if($(window).width() < 960){
			  		initLocationProcedure();
				};

	            //Toggle controls for map -- mobile --
	            /*
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
				*/
			}
    	};
  	}]);