'use strict';

angular.module('blipApp')
    .controller('IndividualResultPageCtrl', ['ResultPageState', '$scope','uiGmapGoogleMapApi', function(ResultPageState, $scope) {

    	$scope.pageViewData = ResultPageState.GetPageState();
    }])
    .directive('watchLocation',['ResultPageState', function(ResultPageState) {

    	//Stores data pulled from the 'ResultPageState' factory
    	var pageViewData = ResultPageState.GetPageState();
    	console.log(pageViewData.MapLong);
    	console.log(pageViewData.MapLong);

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
				    var mapDiv = document.getElementById('map');
				    var map = new google.maps.Map(mapDiv, {
				      center: {lat: position.coords.latitude, lng: position.coords.longitude},
				      zoom: 14,
				    });

				    //Set users current position
				    var marker = new google.maps.Marker({
					    position: {lat: position.coords.latitude, lng: position.coords.longitude},
					    map: map,
					    title: 'You Are Here'
				  	});

				  	var marker = new google.maps.Marker({
					    position: {lat: parseFloat(pageViewData.MapLat), lng: parseFloat(pageViewData.MapLong)},
					    map: map,
					    title: pageViewData.LocationName
				  	});

				  	

				    console.log(position.coords.longitude + " Longitude updated");
				    console.log(position.coords.latitude + " Latitude update");
				}		    
    		}

    	}
  	}]);