'use strict';

angular.module('blipApp')
	.controller('NavCtrl',['$scope', function ($scope) 
	{
		$scope.classCheck = false;
	  	$scope.setSideClass = function(){
		    if($scope.classCheck === false)
		    {
		    	$scope.classCheck = true;
		    	console.log($scope.classCheck);
			}
			else
			{
				$scope.classCheck = false;
				console.log($scope.classCheck);
			}
		};
	}]);

