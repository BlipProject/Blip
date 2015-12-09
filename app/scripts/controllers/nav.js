'use strict';

angular.module('blipApp')
  .controller('NavCtrl',['$scope', function ($scope) {
    
    //Controls mobile nav toggle
    $scope.toggle = function() {
        $scope.$broadcast('event:toggle');
    }
  	/*
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
	*/
  }])
  .directive('toggle', function() {
    return function(scope, elem, attrs) {
        scope.$on('event:toggle', function() {
            elem.slideToggle();
        });
    };
});
