'use strict';

angular.module('blipApp')
  .controller('NavCtrl',['$scope', function ($scope) {
  		$scope.navStatus=0;
  		$scope.activeClass="m-nav-wrapper-hide";

  		$scope.setNav = function(){
  			console.log($scope.navStatus);
  			if($scope.navStatus === 0)
  			{
  				$scope.activeClass="m-nav-wrapper-show";
  				$scope.navStatus = 1;
  			}
  			else
  			{
  				$scope.activeClass="m-nav-wrapper-hide";
  				$scope.navStatus = 0;
  			}
  		};

  }]);
