'use strict';

angular.module('blipApp')
  .controller('IndividualResultPageCtrl', ['ResultPageState','$scope', function (ResultPageState,$scope) {

    $scope.pageViewData = ResultPageState.GetPageState();
    
  }]);