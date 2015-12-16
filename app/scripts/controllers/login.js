'use strict';

angular.module('blipApp')
    .controller('LoginCtrl', ['$http', '$scope', function($http, $scope) {

        $scope.pageHeading = "LOGIN";

        $scope.loginUser = function(userEmail, userPassword) {
            var userDetails = {
                email: userEmail,
                password: userPassword
            };
            console.log(userDetails);
            //WORK ON LOCALHOST
            //var postReg = $http.post('http://localhost/blip/app/phpCore/login.php', userDetails)
            var postReg = $http.post('http://bliptest.azurewebsites/blip/app/phpCore/login.php', userDetails)
                .success(function(data, status, headers, config) {
                    console.log(status + ' - ' + "Success");
                    alert("Success");
                    location.reload();
                })
                .error(function(data, status, headers, config) {
                    console.log(status + ' - ' + 'Error');
                });
        };
    }]);
