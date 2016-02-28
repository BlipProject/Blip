'use strict';

/**
 * @ngdoc function
 * @name blipApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the blipApp
 */
angular.module('blipApp')
    .controller('UserRegistrationCtrl', ['$http', '$scope', function($http, $scope) {
        $scope.pageHeading = "User Registration";





        //to do  if element is valid do progressrar##################
        $scope.userName = "";
        $scope.userCountry = "";
        $scope.userEmail = "";
        $scope.userPassword = "";

        $scope.$watch("userName", function(newValue, oldValue) {
            if ($scope.userName.length > 0) {
                document.getElementById("1").className += " ng-hide";
                document.getElementById("2").className += "";
                document.getElementById("2").className += "ng-show";
            }

        });
        //###########################################################
        $scope.createRegistration = function(userName, userCountry, userEmail, userPassword) {



            //all ok
            var userDetails = {
                name: userName,
                country: userCountry,
                email: userEmail,
                password: userPassword
            };
            //console.log(userDetails);
            //LOCALHOST
            var postReg = $http.post('../phpCore/userReg.php', userDetails)
            //var postReg = $http.post('http://bliptest.azurewebsites/blip/app/phpCore/userReg.php', userDetails)
                .success(function(data, status, headers, config) {
                    alert("Success");
                    location.reload();
                    //console.log(status + ' - ' + "Success");
                })
                .error(function(data, status, headers, config) {
                    //console.log(status + ' - ' + 'Error');
                });



        };
    }]);
