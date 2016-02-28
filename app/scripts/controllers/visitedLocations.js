'use strict';

angular.module('blipApp')
	.controller('VisitedLocationsCtrl', ['$http', 
	'$scope',
	function($http, $scope) {

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

			    	var div = document.getElementById("visitedCountriesMap");
					map.write(div);
				});
    		}
		}
	}]);