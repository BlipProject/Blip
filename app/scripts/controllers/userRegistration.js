'use strict';

/**
 * @ngdoc function
 * @name blipApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the blipApp
 */
angular.module('blipApp')
  .controller('UserRegistrationCtrl', ['$http','$scope' ,function ($http,$scope) {

  $scope.userDetails;

  $scope.createRegistration = function (name, country, email, password) {
  	$scope.userDetails = {
  		userName:name, 
  		userCountry:country,
  		userEmail:email,
  		userPassword:password
  	}
  	//$scope.userDetails
  var postReg = $http.post('http://localhost/blip/app/phpCore/userReg.php', $scope.userDetails)
      .success(function(data, status, headers, config)
      {
        console.log(status + ' - ' + "Success");        
      })
      .error(function(data, status, headers, config)
      {
          console.log(status + ' - ' + 'Error');
      });
  };
}]);