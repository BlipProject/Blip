'use strict';

angular.module('blipApp')
	.controller('UserLocationsCTRL', ['$http', '$scope', function($http, $scope) {

		$scope.searchResult = "";

		var user = {
			ID: 311
		};

		$scope.getUserLocations = function() {
			$scope.searchResult = $http.post('http://localhost/blip/app/phpCore/get_userLocations.php', user)
				.then(function(response)
				{
					console.log("Success");
					console.log(response.data);
				})
		};

	}]);