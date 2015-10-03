'use strict';

angular.module('blipApp')
	
	.controller('LocationSearchCtrl', ['$http','$scope', function ($http,$scope) {

		//Stores geolocation data to send to phph script
		var data;
		//Store search result returned from server
		var searchResult;

		if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(function(position){
		      $scope.$apply(function(){
		        $scope.position = position;
		        data = [{
		        	longitude:position.coords.longitude,
		        	latitudelatitude:position.coords.latitude
		        }];

		        getLocationResults(data);

		        console.log(data);
		      });
		    });
		}

		//TODO Change post URL to reletive link
		var getLocationResults = function(data){
			searchResult = $http.post('http://localhost/blip/app/phpCore/search.php', data)
		        .success(function(data, status, headers, config)
		        {
				    console.log( status + ' - ' + "Success");
		            searchResult = JSON.stringify(data);
		            //console.log(searchResult);          
	            })
		        .error(function(data, status, headers, config)
		        {
		            console.log('error');
		        });
		};
}]);

