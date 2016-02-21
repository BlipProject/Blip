'use strict';

/**
 * @ngdoc function
 * @name blipApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the blipApp
 */
angular.module('blipApp')
    .controller('RegisterBusinessCtrl', ['$http', 
        '$scope', 
        'NationalityService', 
        'uiGmapGoogleMapApi', 
        function($http, $scope, NationalityService, uiGmapGoogleMapApi) {

        //Store categories and nationalities for dropdowns
        $scope.categories;
        $scope.nationalities;

        $scope.addLocationMapMarker = {
            id: 5,
            coords: {
            }
        };

        $scope.map = {
            center: {
                latitude: 54.2785534,
                longitude: -8.4600902
            },
            zoom: 16,
            events: {
                click: function(mapModel, eventName, originalEventArgs) {
                    var e = originalEventArgs[0];
                    $scope.addLocationMapMarker.coords.latitude = e.latLng.lat();
                    $scope.addLocationMapMarker.coords.longitude = e.latLng.lng();
                    $scope.$apply();

                    var latlng = {lat: parseFloat(e.latLng.lat()), lng: parseFloat(e.latLng.lng())};
                    console.log(latlng);
                    var geocoder = new google.maps.Geocoder;
                    geocoder.geocode({'location': latlng}, function(results, status) {
                        console.log(results);
                        console.log(results[0].formatted_address);
                        $scope.locationAddress = results[0].formatted_address;
                        $scope.$apply();
                    });
                }
            }
        };

        ///////////
        //IMPORTANT Change post URL to reletive link before build... '../phpCore/get_categories.php'
        ///////////
        //TESTING URL http://localhost/blip/app/phpCore/get_categories.php
        $scope.loadCategories = function() {
            var getCategories = $http.post('http://localhost/blip/app/phpCore/get_categories.php')
                .success(function(data, status, headers, config) {
                    $scope.categories = data;
                    console.log(status + ' - ' + "Success");
                })
                .error(function(data, status, headers, config) {
                    console.log(status + ' - ' + 'Error');
                });
        };

        $scope.loadNationalities = function() {
            NationalityService.getNationalities().then(function(data){
                $scope.nationalities = data;
                console.log($scope.nationalities);
            });
        };

        uiGmapGoogleMapApi.then(function(maps) {
            if( typeof _.contains === 'undefined' ) {
                _.contains = _.includes;
            }
            if( typeof _.object === 'undefined' ) {
                _.object = _.zipObject;
            }
        });

        $scope.getCoordinates = function(locationAddress) {

            $scope.geodata = {};
            $scope.queryResults = {};
            $scope.queryError = {};

            $scope.address = locationAddress;

            $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
                    $scope.address + '&key=AIzaSyCn9zl42b2gnUt92A7v_OcAJB4OUem-zbM')
                .then(function(_results) {
                        console.log(_results.data);

                        $scope.queryResults = _results.data.results;
                        $scope.geodata = $scope.queryResults[0].geometry;

                        var locationLatLng = $scope.queryResults[0].geometry.location;
                        console.log(locationLatLng);

                        $scope.map = {
                            center: {
                                latitude: locationLatLng.lat,
                                longitude: locationLatLng.lng
                            },
                            zoom: 16
                        };
                        $scope.addLocationMapMarker = {
                            id: 5,
                            coords: {
                                latitude: locationLatLng.lat.toFixed(5),
                                longitude: locationLatLng.lng
                            }
                        };
                    },
                    function error(_error) {
                        $scope.queryError = _error;
                        console.log($scope.queryError);
                    })
        }

        $scope.addLocation = function(locationName, locationDescription, locationNationality, locationCategory, locationAddress) {

            var locationData = {
                name: locationName,
                latitude: parseFloat($scope.addLocationMapMarker.coords.latitude.toFixed(6)),
                longitude: parseFloat($scope.addLocationMapMarker.coords.longitude.toFixed(6)),
                city: locationAddress,
                nationality: parseInt(locationNationality.NationalityID),
                category: parseInt(locationCategory.CategoryID),
                description: locationDescription,
                userid: 311

            };

            console.log(locationData);

            var insertBus = $http.post('http://localhost/blip/app/phpCore/register_business.php', locationData)
                .success(function(data, status, headers, config) {
                    $scope.business = data;
                    console.log(locationData + ' - ' + "Success");
                })
                .error(function(data, status, headers, config) {
                    console.log(status + ' - ' + 'Error');
                });
        };

    }]);