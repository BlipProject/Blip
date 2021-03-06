'use strict';

angular.module('blipApp')
    .controller('SettingsPannel', ['$scope', '$http', 'NationalityService', '$rootScope', function($scope, $http, NationalityService, $rootScope) {


    	$scope.userName = $rootScope.userNameCookie;
        $scope.userCountry = $rootScope.userCountryCookie;
        $scope.nationalities = {};
        $scope.userPic = $rootScope.userPic;

        function loadNationalities(){
            if(localStorage.getItem("cacheNat") === null) {
                NationalityService.getNationalities().then(function(data){
                    $scope.nationalities = JSON.parse(data)
                });
            }
            else { $scope.nationalities = JSON.parse(localStorage.cacheNat) };
        };

        $scope.init = loadNationalities();


    }]);
