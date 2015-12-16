'use strict';

/**
 * @ngdoc function
 * @name blipApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the blipApp
 */
angular.module('blipApp')
    .controller('RegisterBusinessCtrl', ['$http', '$scope', 'uiGmapGoogleMapApi', function($http, $scope, uiGmapGoogleMapApi) {

        $scope.pageHeading = "Register Your Business";
        //Store categories for dropdown
        $scope.categories;
        //Store data about business to send to php script
        //var busData = {};
        //Store business latitude and longtitude
        var busLat;
        var busLng;

        $scope.map = {
            center: {
                latitude: 54.276293,
                longitude: -8.476524
            },
            zoom: 16
        };
        $scope.busmarker = {
            id: 5,
            coords: {
                latitude: 54.276293,
                longitude: -8.476524
            }
        };

        $scope.openingHours = {
            mon: "Closed",
            tue: "Closed",
            wed: "Closed",
            thu: "Closed",
            fri: "Closed",
            sat: "Closed",
            sunday: "Closed"
        }

        ///////////
        //IMPORTANT Change post URL to reletive link before build... '../phpCore/get_categories.php'
        ///////////
        //TESTING URL http://localhost/blip/app/phpCore/get_categories.php
        $scope.loadCategories = function() {
            var getCategories = $http.post('http://localhost/blip/app/phpCore/get_categories.php')
                .success(function(data, status, headers, config) {
                    $scope.categories = data;
                    console.log(data + ' - ' + "Success");
                })
                .error(function(data, status, headers, config) {
                    console.log(status + ' - ' + 'Error');
                });
        };

        uiGmapGoogleMapApi.then(function(maps) {});

        $scope.setDayClass = function(event) {
            if ($(event.target).hasClass("opening-hours-day-selected")) {
                $(event.target).removeClass("opening-hours-day-selected");
            } else {
                $(event.target).addClass("opening-hours-day-selected");
            }
        };

        $scope.addOpeningHours = function(openTime, closeTime) {

            if (openTime != undefined || closeTime != undefined) {
                var format = String(openTime).slice(16, 21) + " - " + String(closeTime).slice(16, 21);
                loopSelectedDays(format);
            } else {
                loopSelectedDays("Closed");
            }
        };

        var loopSelectedDays = function(formated) {
            $('.opening-hours-day-selected').each(function(i, obj) {
                switch (obj.innerHTML) {
                    case "Mon":
                        $scope.openingHours.mon = formated;
                        break;
                    case "Tue":
                        $scope.openingHours.tue = formated;
                        break;
                    case "Wed":
                        $scope.openingHours.wed = formated;
                        break;
                    case "Thu":
                        $scope.openingHours.thu = formated;
                        break;
                    case "Fri":
                        $scope.openingHours.fri = formated;
                        break;
                    case "Sat":
                        $scope.openingHours.sat = formated;
                        break;
                    case "Sun":
                        $scope.openingHours.sunday = formated;
                        break;
                }
            });
        };

        $scope.getCoordinates = function(busAddress, busAddress2, busCity, busCountry) {

            $scope.geodata = {};
            $scope.queryResults = {};
            $scope.queryError = {};
            //$scope.address = document.getElementById('busaddress').value;
            $scope.address = busAddress + " " + busAddress2 + " " + busCity + " " + busCountry;
            console.log($scope.address);

            $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
                    $scope.address + '&key=AIzaSyCn9zl42b2gnUt92A7v_OcAJB4OUem-zbM')
                .then(function(_results) {
                        console.log(_results.data);

                        $scope.queryResults = _results.data.results;
                        $scope.geodata = $scope.queryResults[0].geometry;

                        var buslatlng = $scope.queryResults[0].geometry.location;
                        console.log(buslatlng);

                        $scope.map = {
                            center: {
                                latitude: buslatlng.lat,
                                longitude: buslatlng.lng
                            },
                            zoom: 16
                        };
                        $scope.busmarker = {
                            id: 5,
                            coords: {
                                latitude: buslatlng.lat.toFixed(5),
                                longitude: buslatlng.lng
                            }
                        };

                        busLat = buslatlng.lat;
                        busLng = buslatlng.lng;

                    },
                    function error(_error) {
                        $scope.queryError = _error;
                        console.log($scope.queryError);
                    })
        }

        $scope.registerBusiness = function(busName, busCity, busDescription) {
            alert("got here");
            //May have broke.. revert to get element by id to fix
            var catEl = $("#busCategory");
            var busCategory = catEl.options[catEl.selectedIndex].value;

            var busData = {
                name: busName,
                latitude: parseFloat(busLat),
                longtude: busLng,
                city: busCity,
                description: busDescription,
                category: busCategory

            };

            console.log(busData);

            var insertBus = $http.post('http://localhost/blip/app/phpCore/register_business.php', busData)
                .success(function(data, status, headers, config) {
                    $scope.business = data;
                    console.log(busData + ' - ' + "Success");
                })
                .error(function(data, status, headers, config) {
                    console.log(status + ' - ' + 'Error');
                });
        };

    }]);
