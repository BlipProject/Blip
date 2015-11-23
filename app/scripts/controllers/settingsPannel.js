'use strict';

angular.module('blipApp')
  .controller('SettingsPannel',['$scope','$http','PopulateCountryDropdown', function ($scope,$http,PopulateCountryDropdown) {

  	$scope.nationalities={};

  	$scope.getNationalities = function(){
			PopulateCountryDropdown.getNationalities().then(function(data){
				$scope.nationalities = data;
			});
		};

  }]);