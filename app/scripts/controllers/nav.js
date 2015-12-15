'use strict';

angular.module('blipApp')
  .controller('NavCtrl',['$scope','$rootScope', function ($scope,$rootScope) {
      //Store animate in/out classes for mobile nav
  		$rootScope.toggleNavClass=  $rootScope.animateOut;

      //Set nav bar animation class
  		$scope.setNav = function(){
  			if($rootScope.toggleNavClass === $rootScope.animateOut)
  			{
  				$rootScope.toggleNavClass = $rootScope.animateIn;
  			}
  			else
  			{
  				$rootScope.toggleNavClass = $rootScope.animateOut;
  			}
  		};
  }]);