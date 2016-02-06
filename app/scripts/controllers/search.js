'use strict';

angular.module('blipApp')

.controller('LocationSearchCtrl', ['$http',
    '$scope',
    'GeoLocationService',
    'SearchServices',
    'ResultPageState',
    '$location',
    '$rootScope',
    function($http, $scope, GeoLocationService, SearchServices, ResultPageState, $location, $rootScope) {

        //Close mobile-navigation menu on page load
        $rootScope.toggleNavClass = $rootScope.animateOut;
        //Store search result returned from server
        $scope.searchResult = "";
        //Stores filtered data (Quick filter buttons)
        $scope.filterSearchResult = [];
        //Variable to set the number of results displayed initialy
        //Modify to show more/less results
        $scope.showAmountFilter = 30;
        //Stores users nationality to pass to server
        //Hardcoded currently for testing -- 671 == France
        $scope.userNationality = 671;
        //Show loading animation -- sets to false when results are returned from server
        $scope.showLoadingAnimation = true;

        //Called from Nationality dropdown in "settingsPannel.html" to set "userNationality"
        //Then calls getLocation and which passes new country to database sproc
        $scope.getLocationNewCountry = function(newCountry) {
            $scope.userNationality = newCountry;
            console.log("New country - " + newCountry + " - set");
            $scope.getLocation();
        };

        //Calls geoServices to return the current coordinates
        //navigator must be passed to service (dont no why ??)
        $scope.getLocation = function() {
            GeoLocationService.getGeoCoordinates(navigator).then(function(data) {
                console.log("GeoServices called succesfully");
                data.nationality = $scope.userNationality;
                data.showLimit = $scope.showAmountFilter;
                returnSearchResults(data);
            });
        };

        //Calls SearchServices to return search results
        //Takes 1 argument ([current coordinates])
        var returnSearchResults = function(geoData) {
            SearchServices.getLocationResults(geoData).then(function(data) {
                $scope.searchResult = data;
                $scope.filterSearchResult = $scope.searchResult;
                console.log($scope.filterSearchResult);
                $scope.showLoadingAnimation = false;
                console.log("SearchServices called succesfully");
            });
        };

        //Called from front-end to set filtered results and set active class on button
        $scope.setFilterSetClass = function(filter, index) {
            getFilter(filter);
            setQuickFilterClass(index);
        };

        //Called to return filtered content
        //If search result matches the filter button it gets pushed into 'filterSearchResult' array
        //else 'filterSearchResult' equals the content that was origionaly returned from the server
        var getFilter = function(filter) {
            if (filter !== "All") {
                $scope.filterSearchResult = [];
                angular.forEach($scope.searchResult, function(value) {
                    if (value.CategoryName === filter) {
                        $scope.filterSearchResult.push(value);
                    }
                });
            } else {
                $scope.filterSearchResult = $scope.searchResult;
            }
        };

        //Sets active class on selected filter button
        $scope.activeFilter = 0;
        var setQuickFilterClass = function(type) {
            $scope.activeFilter = type;
        };

        //Set class for individual search results based off location type
        //typeHeadClass -- controls the serarch result header
        //setIconClass -- controls the icon that is displayed on the header
        //return class controls the styles for the hover action on each result
        $scope.typeHeadClass = " ";
        $scope.setIconClass = " ";
        $scope.setResultClass = function(classIn) {
            switch (classIn) {
                case 'Bar':
                    {
                        $scope.typeHeadClass = "result-header-bar";
                        $scope.setIconClass = "fa fa-glass fa-lg";
                        return "result-hover-button-bar";
                    }
                case 'Restaurant':
                    {
                        $scope.typeHeadClass = "result-header-restaurant";
                        $scope.setIconClass = 'fa fa-cutlery fa-lg';
                        return "result-hover-button-restaurant";
                    }
                case 'Supermarket':
                    {
                        $scope.typeHeadClass = "result-header-shop";
                        $scope.setIconClass = 'fa fa-shopping-cart fa-lg';
                        return "result-hover-button-shop";
                    }
                case 'Other':
                    {
                        $scope.typeHeadClass = "result-header-other";
                        $scope.setIconClass = "fa fa-ellipsis-h fa-lg";
                        return "result-hover-button-other";
                    }
                default:
                    {
                        return "";
                    }
            }
        };

        //On hover button click calls the 'ResultPage Factory' to store the pages state
        //Then redirects to page for that result
        $scope.storeFocusedResult = function(index) {
            ResultPageState.SetPageState($scope.filterSearchResult[index]);
            console.log($scope.filterSearchResult[index]);
            $location.path('LocationView');
        };
    }
]);
