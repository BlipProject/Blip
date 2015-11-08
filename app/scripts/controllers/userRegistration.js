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

    //$scope.userDetails;
//name, country, email, password
  $scope.createRegistration = function (userName, userCountry, userEmail, userPassword) {
    var c = $('#my_dropdown');

    if(!isNaN(c.data('kendoComboBox').value()) && isNaN(c.data('kendoComboBox').text()))
    {
        //all ok
      var userDetails = {
      name:userName, 
      country:userCountry,
      email:userEmail,
      password:userPassword
    };
    //console.log(userDetails)
    
  var postReg = $http.post('http://localhost/blip/app/phpCore/userReg.php', userDetails)
      .success(function(data, status, headers, config)
      {
        //console.log(status + ' - ' + "Success");        
      })
      .error(function(data, status, headers, config)
      {
          //console.log(status + ' - ' + 'Error');
      });
 

    }
      else 
      {
        // country validation failed
      }  
    };
}]);
  