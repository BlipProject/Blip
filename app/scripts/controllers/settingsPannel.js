'use strict';

angular.module('blipApp')
    .controller('SettingsPannel', ['$scope', '$http', 'NationalityService', 'SideBarPageInView', function($scope, $http, NationalityService, SideBarPageInView) {

        $scope.nationalities = {};

        function loadNationalities(){
            NationalityService.getNationalities().then(function(data){
                $scope.nationalities = data;
            });
        };

        $scope.init = loadNationalities();
    }]);
