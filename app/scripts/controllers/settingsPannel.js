'use strict';

angular.module('blipApp')
    .controller('SettingsPannel', ['$scope', '$http', 'PopulateCountryDropdown', 'SideBarPageInView', function($scope, $http, PopulateCountryDropdown, SideBarPageInView) {

        $scope.nationalities = {};

        $scope.getNationalities = function() {
            PopulateCountryDropdown.getNationalities().then(function(data) {
                $scope.nationalities = data;
            });
        };

        $scope.isActive = SideBarPageInView.GetPage();
        console.log($scope.isActive);
        $scope.setActive = function(currentTab) {
            SideBarPageInView.SetPage(currentTab);
        };

    }]);
