'use strict';

angular.module('blipApp')
  .controller('AccountSettingsCtrl', ['$http',
  	'$scope',
  	'$rootScope',
    '$location',
  	function ($http, $scope, $rootScope, $location) {

      $scope.currentPath = $location.path();

  		$scope.loadNationalities = function() {
            if(localStorage.getItem("cacheNat") === null) {
                NationalityService.getNationalities().then(function(data){
                    $scope.nationalities = JSON.parse(localStorage.cacheNat)
                });
            }
            else { $scope.nationalities = JSON.parse(localStorage.cacheNat) };
        };
  }]);