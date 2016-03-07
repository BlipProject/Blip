'use strict';

angular.module('blipApp')
    .controller('NavCtrl', ['$scope', '$rootScope', '$location','CookieService', function($scope, $rootScope, $location, CookieService) {


        CookieService.checkCookie;

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

        //Redirect to the correct page when an option is selected in the mobile profile dropdown
        $scope.ProfileOptionSelected = function(ProfileOption) {
            switch(ProfileOption.substring(2)) {
                case "Visited locations":
                    $location.path('visitedLocations');
                    break;
                case "Add location":
                    $location.path('registerbusiness');
                    break;
                case "My locations":
                    $location.path('userLocations');
                    break;
                case "Account Settings":
                    $location.path('accountSettings');
                    break;
                case "Logout":
                    $location.path('registerbusiness');
                    break;
            }
        };
    }]);
