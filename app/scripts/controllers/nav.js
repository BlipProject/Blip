'use strict';

angular.module('blipApp')
    .controller('NavCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
        //Store animate in/out classes for mobile nav
        $rootScope.toggleNavClass = $rootScope.animateOut;

        //Set nav bar animation class
        $scope.setNav = function() {
            if ($rootScope.toggleNavClass === $rootScope.animateOut) {
                $rootScope.toggleNavClass = $rootScope.animateIn;
            } else {
                $rootScope.toggleNavClass = $rootScope.animateOut;
            }
        };

        //Set current new page active and redirect to new page
        $scope.setActive = function(currentTab, redirect) {
            $rootScope.mobileNavPageActive = currentTab;
            $location.path(redirect);
        };

        $scope.isActive = function(){
            return $rootScope.mobileNavPageActive;
        };
    }]);
