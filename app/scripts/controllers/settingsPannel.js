'use strict';

angular.module('blipApp')
  .controller('SettingsPannel',['$scope','$http','PopulateCountryDropdown', function ($scope,$http,PopulateCountryDropdown,SideBarPageInView) {

  	$scope.nationalities={};

  	$scope.getNationalities = function(){
		PopulateCountryDropdown.getNationalities().then(function(data){
			$scope.nationalities = data;
		});
	};
	/*
	$scope.isActive = SideBarPageInView.GetPage();
	$scope.setActive = function(currentTab){
		SideBarPageInView.SetPage(currentTab);
	};
	*/
  }]);