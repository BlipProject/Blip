'use strict';

angular.module('blipApp')
	.controller('UserLocationsCTRL', ['$http', '$scope', function($http, $scope) {

		$scope.searchResult = "";
        $scope.showLoadingAnimation = true;

		var user = {
			ID: 311
		};

		$scope.getUserLocations = function() {
			$http.post('http://localhost/blip/app/phpCore/get_user_locations.php', user)
				.then(function(response)
				{
					console.log("Success");
                    $scope.showLoadingAnimation = false;
					$scope.searchResult = response.data;
				});
		};

		console.log($scope.searchResult);

        $scope.typeHeadClass = " ";
        $scope.setIconClass = " ";
		$scope.setResultClass = function(classIn) {
            switch (classIn) {
                case 'Bar':
                    {
                        $scope.typeHeadClass = "result-header-bar";
                        $scope.setIconClass = "fa fa-glass fa-lg";
                        return "result-hover-button-bar";
                    }
                case 'Restaurant':
                    {
                        $scope.typeHeadClass = "result-header-restaurant";
                        $scope.setIconClass = 'fa fa-cutlery fa-lg';
                        return "result-hover-button-restaurant";
                    }
                case 'Supermarket':
                    {
                        $scope.typeHeadClass = "result-header-shop";
                        $scope.setIconClass = 'fa fa-shopping-cart fa-lg';
                        return "result-hover-button-shop";
                    }
                case 'Other':
                    {
                        $scope.typeHeadClass = "result-header-other";
                        $scope.setIconClass = "fa fa-ellipsis-h fa-lg";
                        return "result-hover-button-other";
                    }
                default:
                    {
                        return "";
                    }
            }
        };

	}]);