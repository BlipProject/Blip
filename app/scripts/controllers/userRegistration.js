'use strict';

/**
 * @ngdoc function
 * @name blipApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the blipApp
 */
angular.module('blipApp')
  .controller('UserRegistrationCtrl', ['$scope' ,function ($scope) {

  	$scope.userDetails;


   $scope.createRegistration = function (name, country, email, password) {
   	$scope.userDetails = {
   		userName:name, 
   		userCountery:country,
   		userEmail:email,
   		userPassword:password
   	}
   	console.log($scope.userDetails);
   };
  }]);