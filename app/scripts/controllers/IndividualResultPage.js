'use strict';

angular.module('blipApp')
    .controller('IndividualResultPageCtrl', ['ResultPageState', '$scope', function(ResultPageState, $scope) {

        //Stores data pulled from the 'ResultPageState' factory
        $scope.pageViewData = ResultPageState.GetPageState();

    }]);
