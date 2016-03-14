'use strict';

angular.module('blipApp')
	.controller('VisitedLocationsCtrl', ['$http',
	'$scope',
    '$rootScope',
    '$location',
	function($http, $scope, $rootScope, $location) {

        //Close mobile-navigation menu on page load
        $rootScope.toggleNavClass = $rootScope.animateOut;

        $scope.currentPath = $location.path();

		$scope.visitedLocations = "";
		$scope.filterVisitedLocations = [];
		$scope.showLoadingAnimation = true;

		var user = {
			ID: parseInt($rootScope.userIdCookie),
		};

		$scope.getVisitedLocations = function() {

            if(localStorage.getItem("cacheVisit") === null) {
                $http.post('http://localhost/blip/app/phpCore/get_visited_locations.php', user)
                .then(function(response)
                {
                    $scope.visitedLocations = response.data;
                    $scope.filterVisitedLocations = $scope.visitedLocations;

                    localStorage.cacheVisit = JSON.stringify($scope.filterVisitedLocations);
                });
            }
            else{ $scope.filterVisitedLocations = JSON.parse(localStorage.cacheVisit)}

            $scope.showLoadingAnimation = false;
            $(".visited-locations").removeClass("hide");
		};

        $scope.editReview = function(location, user, index) {
            $("#myModal").modal('show');
            $scope.commentTitle = $scope.filterVisitedLocations[index].CommentTitle;
            $scope.commentText = $scope.filterVisitedLocations[index].CommentText;
            $scope.index = index;
        };

        $scope.cancelEdit = function() {
            $("#myModal").modal('hide');
        };

        $scope.updateReview = function(rate, title, text) {

            $scope.review = {
                locID:  $scope.filterVisitedLocations[$scope.index].LocationID,
                userID: $rootScope.userIdCookie,
                title: title,
                text: text,
                rating: rate
            };

            var update = $http.post('http://localhost/blip/app/phpCore/update_review.php', $scope.review)
                .success(function(data, status, headers, config) {
                    console.log(status + ' - ' + 'Success');
                })
                .error(function(data, status, headers, config) {
                    console.log(status + ' - ' + 'Error');
                });

            $("#myModal").modal('hide');

            $scope.filterVisitedLocations[$scope.index].CommentTitle = $scope.review.title;
            $scope.filterVisitedLocations[$scope.index].CommentText = $scope.review.text;
            $scope.filterVisitedLocations[$scope.index].ThumbsUp = $scope.review.rating;

            localStorage.cacheVisit = JSON.stringify($scope.filterVisitedLocations)
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
                        return "";
                    }
                case 'Restaurant':
                    {
                        $scope.typeHeadClass = "result-header-restaurant";
                        $scope.setIconClass = 'fa fa-cutlery fa-lg';
                        return "";
                    }
                case 'Supermarket':
                    {
                        $scope.typeHeadClass = "result-header-shop";
                        $scope.setIconClass = 'fa fa-shopping-cart fa-lg';
                        return "";
                    }
                case 'Other':
                    {
                        $scope.typeHeadClass = "result-header-other";
                        $scope.setIconClass = "fa fa-ellipsis-h fa-lg";
                        return "";
                    }
                default:
                    {
                        return "";
                    }
            }
        };

        $scope.init = getFilter('All');
	}])
	.directive('profileMap', ['$rootScope', function($rootScope) {

		return {
			restrict: 'E',
    		replace: true,
    		scope: true,

    		link:function(scope, element, attributes){

    			$(document).ready(function() {

					var map = new AmCharts.AmMap();
					map.pathToImages = "bower_components/ammap3/images/";

                    var userVisitedCountries = [];
                    var areas = [];

                    if($rootScope.userVisitedCookie != undefined) {
                        userVisitedCountries = $rootScope.userVisitedCookie.split("-");
                    }

                    for(var i=0;i<userVisitedCountries.length; i++) {
                        var country = {
                            id: userVisitedCountries[i],
                        }
                        areas.push(country);
                    }

					var dataProvider = {
						map: "worldHigh",
						areas: areas,
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