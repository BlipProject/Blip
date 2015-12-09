'use strict';

angular.module('blipApp')
  .controller('LandingCtrl', function ($scope) {

  	//Ho;ds a random number to set class for background inage on Landing page
    $scope.random="";

    //Sets randomnumber
    //Returns random numebr to set background image class on landing page.
    $scope.setBG = function(){
    	$scope.random = Math.floor((Math.random() * 3));
    	console.log($scope.random);
    	return $scope.random;
    }
  });
