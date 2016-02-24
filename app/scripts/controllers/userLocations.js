'use strict';

angular.module('blipApp')
	.controller('UserLocationsCTRL', ['$http', '$scope', function($http, $scope) {

		$scope.userLocations = "";
        $scope.filterUserLocations = [];
        $scope.showLoadingAnimation = true;

		var user = {
			ID: 311
		};

		$scope.getUserLocations = function() {
			$http.post('http://localhost/blip/app/phpCore/get_user_locations.php', user)
				.then(function(response)
				{
					$scope.userLocations = response.data;
                    $scope.filterUserLocations = $scope.userLocations;
                    console.log($scope.filterUserLocations);
                    $scope.showLoadingAnimation = false;
				});
		};

		console.log($scope.userLocations);

        //Called from front-end to set filtered results and set active class on button
        $scope.setFilterSetClass = function(filter, index) {
            getFilter(filter);
            setQuickFilterClass(index);
        };

        //Called to return filtered content
        //If search result matches the filter button it gets pushed into 'filterUserLocations' array
        //else 'filterUserLocations' equals the content that was origionaly returned from the server
        var getFilter = function(filter) {
            if (filter !== "All") {
                $scope.filterUserLocations = [];
                angular.forEach($scope.userLocations, function(value) {
                    if (value.CategoryName === filter) {
                        $scope.filterUserLocations.push(value);
                    }
                });
            } else {
                $scope.filterUserLocations = $scope.userLocations;
            }
        };

        //Sets active class on selected filter button
        $scope.activeFilter = 0;
        var setQuickFilterClass = function(type) {
            $scope.activeFilter = type;
        };

        //Set class for individual search results based off location type
        //typeHeadClass -- controls the serarch result header
        //setIconClass -- controls the icon that is displayed on the header
        //return class controls the styles for the hover action on each result
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

        $scope.confirmDeleteLocation = function(index) {
            $scope.nameToDelete = $scope.filterUserLocations[index].LocationName;
            $scope.indexToDelete = index;
            $("#myModal").modal('show');
        };

        $scope.cancelDeleteLocation = function () {
            $("#myModal").modal('hide');
        }

        $scope.deleteLocation = function() {
            console.log($scope.indexToDelete);
            console.log($scope.filterUserLocations[$scope.indexToDelete]);
            $http.post('../phpCore/delete_location.php', $scope.filterUserLocations[$scope.indexToDelete])
                .then(function(response)
                {
                    console.log("Success");
                });
            $("#myModal").modal('hide');
            $scope.filterUserLocations.splice($scope.indexToDelete, 1);
        };

	}]);