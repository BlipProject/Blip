'use strict';

angular.module('blipApp')
    .controller('SettingsPannel', ['$scope', '$http', 'NationalityService', '$rootScope', function($scope, $http, NationalityService, $rootScope) {


    	$scope.userName = $rootScope.userNameCookie;
        $scope.nationalities = {};

        function loadNationalities(){
            NationalityService.getNationalities().then(function(data){
                $scope.nationalities = data;
            });
        };

        $scope.init = loadNationalities();
    }]);
