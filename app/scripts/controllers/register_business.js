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
    'CategoryService',
    'uiGmapGoogleMapApi',
    '$location',
    'ResultPageState',
    function($http, $scope, NationalityService, CategoryService, uiGmapGoogleMapApi, $location, ResultPageState) {

        //Store categories and nationalities for dropdowns
        $scope.categories = "";
        $scope.nationalities = "";

        uiGmapGoogleMapApi.then(function(maps) {

            //Fix ._contains/._object is not a function
            //Caused by using old version of lodash, installed by bower
            if( typeof _.contains === 'undefined' ) {
                _.contains = _.includes;
            }
            if( typeof _.object === 'undefined' ) {
                _.object = _.zipObject;
            }

            //Data for the map marker
            $scope.addLocationMapMarker = {
                id: 5,
                coords: {
                }
            };

            //Controls if the map can be dragged on a small screen
            $scope.isDraggable = $(document).width() > 480 ? true : false;


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
                },
                options: {
                    draggable: $scope.isDraggable
                }
            };

            $scope.getCoordinates = function(locationAddress) {

                $scope.geodata = {};
                $scope.queryResults = {};
                $scope.queryError = {};

                $scope.address = locationAddress;

                $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='
                + $scope.address + '&key=AIzaSyCn9zl42b2gnUt92A7v_OcAJB4OUem-zbM').then(function(_results) {

                    $scope.queryResults = _results.data.results;
                    $scope.geodata = $scope.queryResults[0].geometry;

                    var locationLatLng = $scope.queryResults[0].geometry.location;

                    $scope.map.center.latitude = locationLatLng.lat;
                    $scope.map.center.longitude = locationLatLng.lng;
                    $scope.addLocationMapMarker.coords.latitude = locationLatLng.lat;
                    $scope.addLocationMapMarker.coords.longitude = locationLatLng.lng;
                },
                function error(_error) {
                    $scope.queryError = _error;
                    console.log($scope.queryError);
                })
            };
        });

        $scope.loadNationalities = function() {
            if(localStorage.getItem("cacheNat") === null) {
                NationalityService.getNationalities().then(function(data){
                    $scope.nationalities = JSON.parse(localStorage.cacheNat)
                });
            }
            else { $scope.nationalities = JSON.parse(localStorage.cacheNat) };
        };

        $scope.loadCategories = function() {
            if(localStorage.getItem("cacheCat") === null) {
                CategoryService.getCategories().then(function(data){
                    $scope.categories = JSON.parse(localStorage.cacheCat)
                });
            }
            else { $scope.categories = JSON.parse(localStorage.cacheCat) };
        };

        $scope.addLocation = function(locationName, locationDescription, locationNationality, locationCategory, locationAddress) {

            $scope.locationData = {
                LocationID: null,
                LocationName: locationName,
                MapLat: parseFloat($scope.addLocationMapMarker.coords.latitude.toFixed(6)),
                MapLng: parseFloat($scope.addLocationMapMarker.coords.longitude.toFixed(6)),
                City: locationAddress,
                Nationality: parseInt(locationNationality.NationalityID),
                CategoryID: parseInt(locationCategory.CategoryID),
                CategoryName: locationCategory.CategoryName,
                LocationDescription: locationDescription,
                UserID: 311,
                LocationPic: "images/busineses_dir/default/def.png"
            };

            var insertBus = $http.post('http://localhost/blip/app/phpCore/register_business.php', $scope.locationData)
                .success(function(data, status, headers, config) {
                    $scope.insertedID = data;
                    $scope.locationData.LocationID = $scope.insertedID;
                })
                .error(function(data, status, headers, config) {
                    console.log(status + ' - ' + 'Error');
                });

            $('#myModal').modal('show');
        };

        $scope.viewNewLocation = function() {
            ResultPageState.SetPageState($scope.locationData);
            $location.path('LocationView');
            $('#myModal').modal('hide');
        };

    }]);