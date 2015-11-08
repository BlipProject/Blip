'use strict';

angular.module('blipApp')
  .controller('LoginCtrl', ['$http','$scope' ,function ($http,$scope) {

  $scope.loginUser = function (userEmail, userPassword) {
      var userDetails = {
      email:userEmail,
      password:userPassword
    };
    console.log(userDetails);
    
  var postReg = $http.post('http://localhost/blip/app/phpCore/login.php', userDetails)
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

