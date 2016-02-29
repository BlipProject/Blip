'use strict';

angular.module('blipApp')
	.controller('VisitedLocationsCtrl', ['$http', 
	'$scope',
	function($http, $scope) {

		$scope.visitedLocations = "";
		$scope.filterVisitedLocations = [];
		$scope.showLoadingAnimation = true;

		var user = {
			ID: 321
		};

		$scope.getVisitedLocations = function() {
			$http.post('http://localhost/blip/app/phpCore/get_visited_locations.php', user)
				.then(function(response)
				{
					$scope.visitedLocations = response.data;
					$scope.filterVisitedLocations = $scope.visitedLocations;
					console.log($scope.visitedLocations);
				    $scope.showLoadingAnimation = false;
				    $(".visited-locations").removeClass("hide");
				});
		};

        $scope.setFilterSetClass = function(filter, index) {
            getFilter(filter);
            setQuickFilterClass(index);
        };

        //Called to return filtered content
        //If search result matches the filter button it gets pushed into 'filterVisitedLocations' array
        //else 'filterVisitedLocations' equals the content that was origionaly returned from the server
        var getFilter = function(filter) {
            if (filter !== "All") {
                $scope.filterVisitedLocations = [];
                angular.forEach($scope.visitedLocations, function(value) {
                    if (value.CategoryName === filter) {
                        $scope.filterVisitedLocations.push(value);
                    }
                });
            } else {
                $scope.filterVisitedLocations = $scope.visitedLocations;
            }
        };

        //Sets active class on selected filter button
        $scope.activeFilter = 0;
        var setQuickFilterClass = function(type) {
            $scope.activeFilter = type;
        };

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

        $scope.init = getFilter('All');
	}])
	.directive('profileMap', [function() {

		return {
			restrict: 'E',
    		replace: true,
    		scope: true,

    		link:function(scope, element, attributes){

    			$(document).ready(function() {

					var map = new AmCharts.AmMap();
					map.pathToImages = "bower_components/ammap3/images/";

					var dataProvider = {
						map: "worldHigh",
						areas: [{id:"IE"},{id:"PL"},{id:"CA"},{id:"RU"},{id:"DZ"},{id:"BR"},{id:"GF"},{id:"PG"},{id:"RO"},{id:"PO"},{id:"IN"},{id:"FR"}],
					};

					map.dataProvider = dataProvider;

					map.areasSettings = {
			        	color: "#16a085",
			        	rollOverOutlineColor: "#16a085",
			    	};

			    	map.smallMap = {
			    		enabled: false
			    	};

			    	map.zoomControl = {
			    		zoomControlEnabled: false,
			    		homeButtonEnabled: false
			    	};

			    	map.dragMap = false;

			    	var mapDiv = document.getElementById("visitedCountriesMap");
					map.write(mapDiv);
				});
    		}
		}
	}]);