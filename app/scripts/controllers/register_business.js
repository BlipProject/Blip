'use strict';

/**
 * @ngdoc function
 * @name blipApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the blipApp
 */
angular.module('blipApp')
  .controller('RegisterBusinessCtrl', ['$http','$scope', 'uiGmapGoogleMapApi', function ($http,$scope,uiGmapGoogleMapApi) {

  	uiGmapGoogleMapApi.then(function(maps) {

  	});

  	$scope.getCoordinates = function(){
		  $scope.geodata = {};
		  $scope.queryResults = {};
		  $scope.queryError = {};
		  $scope.address = document.getElementById('busaddress').value;
		  console.log($scope.address);

		  $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + 
		            $scope.address + '&key=AIzaSyCn9zl42b2gnUt92A7v_OcAJB4OUem-zbM')
		    .then(function(_results){
		       console.log(_results.data);

		       $scope.queryResults = _results.data.results;
		       $scope.geodata = $scope.queryResults[0].geometry;

		         var buslatlng = $scope.queryResults[0].geometry.location;
		  		console.log(buslatlng);

		  		$scope.busmarker =  {
		        id: 5,
		        coords: {
		            latitude: buslatlng.lat,
		            longitude: buslatlng.lng
		        	},
		        data: 'newbusinesslocation',
		        animation: google.maps.Animation.DROP//not working
		    	};


		     }, 
		     function error(_error){
		        $scope.queryError = _error;
		        console.log($scope.queryError);
		     })

		}
  }]);