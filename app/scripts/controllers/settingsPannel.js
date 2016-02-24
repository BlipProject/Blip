'use strict';

angular.module('blipApp')
    .controller('SettingsPannel', ['$scope', '$http', 'NationalityService', 'SideBarPageInView', function($scope, $http, NationalityService, SideBarPageInView) {

        $scope.nationalities = {};

        $scope.loadNationalities = function() {
            NationalityService.getNationalities().then(function(data){
                $scope.nationalities = data;
                console.log($scope.nationalities);
            });
        };

        $scope.isActive = SideBarPageInView.GetPage();
        console.log($scope.isActive);
        $scope.setActive = function(currentTab) {
            SideBarPageInView.SetPage(currentTab);
        };

    }]);
