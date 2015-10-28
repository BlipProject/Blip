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

  	//Store categories for dropdown
  	$scope.categories;
  	//Store data about business to send to php script
  	//var busData = {};
  	//Store business latitude and longtitude
  	var busLat;
  	var busLng;

  	$scope.map = {
  		center: { latitude: 54.276293, longitude: -8.476524},
		zoom: 16
  	};
  	$scope.busmarker =  {
		id: 5,
		coords: {
			latitude: 54.276293,
			longitude: -8.476524
		}
	};

	///////////
	//IMPORTANT Change post URL to reletive link before build... '../phpCore/get_categories.php'
	///////////
	//TESTING URL http://localhost/blip/app/phpCore/get_categories.php
  	$scope.loadCategories = function(){
		var getCategories = $http.post('http://localhost/blip/app/phpCore/get_categories.php')
	        .success(function(data, status, headers, config)
	        {
	        	$scope.categories = data;
			    console.log(data + ' - ' + "Success");
            })
	        .error(function(data, status, headers, config)
	        {
	            console.log(status + ' - ' + 'Error');
	        });
	};

  	$scope.registerBusiness = function(busName, busCity, busDescription) {

  		var catEl = document.getElementById("busCategory");
  		var busCategory = catEl.options[catEl.selectedIndex].value;

  		var busData = {
  			name: busName,
  			latitude: parseFloat(busLat),
  			longtude: busLng,
  			city: busCity,
  			description: busDescription,
  			category: busCategory

  		};

  		console.log(busData);

  		var insertBus = $http.post('http://localhost/blip/app/phpCore/register_business.php', busData)
	        .success(function(data, status, headers, config)
	        {
	        	$scope.business = data;
			    console.log(busData + ' - ' + "Success");
            })
	        .error(function(data, status, headers, config)
	        {
	            console.log(status + ' - ' + 'Error');
	        });
  	};

  	uiGmapGoogleMapApi.then(function(maps) {
  	});

  	$scope.getCoordinates = function(busAddress, busAddress2, busCity, busCountry){

		$scope.geodata = {};
		$scope.queryResults = {};
		$scope.queryError = {};
		//$scope.address = document.getElementById('busaddress').value;
		$scope.address = busAddress + " " + busAddress2 + " " + busCity + " " + busCountry;
		console.log($scope.address);

		$http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + 
		$scope.address + '&key=AIzaSyCn9zl42b2gnUt92A7v_OcAJB4OUem-zbM')
		.then(function(_results){
		console.log(_results.data);

		$scope.queryResults = _results.data.results;
		$scope.geodata = $scope.queryResults[0].geometry;

		var buslatlng = $scope.queryResults[0].geometry.location;
		console.log(buslatlng);

		$scope.map ={
			center: { latitude: buslatlng.lat, longitude: buslatlng.lng},
			zoom: 16
		};
		$scope.busmarker =  {
			id: 5,
			coords: {
				latitude: buslatlng.lat.toFixed(5),
				longitude: buslatlng.lng
			}
		};

		busLat = buslatlng.lat;
		busLng = buslatlng.lng;

		}, 
		function error(_error){
			$scope.queryError = _error;
			console.log($scope.queryError);
		})
	}
}]);