'use strict';

angular.module('blipApp')
  .controller('AccountSettingsCtrl', ['$http',
  	'$scope',
  	'$rootScope',
  	function ($http, $scope, $rootScope) {

  		$scope.loadNationalities = function() {
            if(localStorage.getItem("cacheNat") === null) {
                NationalityService.getNationalities().then(function(data){
                    $scope.nationalities = JSON.parse(localStorage.cacheNat)
                });
            }
            else { $scope.nationalities = JSON.parse(localStorage.cacheNat) };
        };
  }]);