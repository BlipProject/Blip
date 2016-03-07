'use strict';

angular.module('blipApp')
    .controller('MapCtrl', ['ResultPageState',
    '$location',
    '$http',
    '$scope',
    '$timeout',
    'uiGmapGoogleMapApi',
    'uiGmapIsReady',
    'GeoLocationService',
    'SearchServices',
    '$rootScope',
    function(ResultPageState, $location, $http, $scope, $timeout, uiGmapGoogleMapApi, uiGmapIsReady, GeoLocationService, SearchServices, $rootScope) {

        $scope.currentPath = $location.path();
        //Set button active in nav
        $rootScope.mobileNavPageActive = 1;

        uiGmapGoogleMapApi.then(function(maps) {
            //Fix ._contains/._object is not a function
            //Caused by using old version of lodash, installed by bower
            if( typeof _.contains === 'undefined' ) {
                _.contains = _.includes;
            }
            if( typeof _.object === 'undefined' ) {
                _.object = _.zipObject;
            }
        });

        //Close mobile-navigation menu on page load
        $rootScope.toggleNavClass = $rootScope.animateOut;
        //Stores geolocation data to send to php script
        var data;
        //Store search result returned from server
        var searchResult = "";
        $scope.map;

        if($rootScope.tempNewCountry === 0)
            $scope.userNationality = parseInt($rootScope.userNatCookie);
        else
            $scope.userNationality = $rootScope.tempNewCountry;

        $scope.control = {};

        $scope.getLocationNewCountry = function(newCountry) {
            $rootScope.tempNewCountry = parseInt(newCountry);
            $scope.userNationality = $rootScope.tempNewCountry;
            console.log("New country - " + newCountry + " - set");
            $scope.getLocation();
        };

        $scope.getLocation = function() {
            var positionOptions = {
                enableHighAccuracy: true,
                timeout: 1000,
                maximumAge: 500
            };


            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position, positionOptions) {
                    $scope.$apply(function() {
                        $scope.position = position;
                        data = {
                            longitude: position.coords.longitude,
                            latitude: position.coords.latitude,
                            nationality: $scope.userNationality,
                            showLimit: "30"
                        };


                        getLocationResults(data);
                        //alert(data.longitude + " " + data.latitude);


                        $scope.map = {
                            center: {
                                latitude: data.latitude,
                                longitude: data.longitude
                            },
                            options: $scope.mapOptions,
                            zoom: 14,
                        };


                        $rootScope.youarehere = {
                            id: 1,
                            coords: {
                                latitude: data.latitude,
                                longitude: data.longitude
                            },
                            options: {
                                labelContent: 'You',
                                labelAnchor: '10 0',
                                labelClass: 'marker-labels',
                                labelVisible: true,
                                icon: 'images/map_icons/your_location_icon.png',
                                animation: 1
                            }

                        };


                        $scope.busmarker = {
                            id: 5,
                            coords: {
                                latitude: data.latitude,
                                longitude: data.longitude
                            }
                        };

                    });
                });
            }

            //initialising the selected marker as a marker object
            $scope.selectedmarker = {};
            $scope.map.control = {};

            $scope.onClick = function(data) {
                $scope.selectedmarker = data;
                $scope.$apply();
                $scope.windowOptions.show = !$scope.windowOptions.show;
                $scope.$apply();
            };

            $scope.markers = [];


            $scope.windowOptions = {
                show: false,
                pixelOffset: {
                    width: -1,
                    height: -20
                },
                maxWidth: 500,
                closeBoxURL: "",
                closeBoxMargin : ""
            };


            $scope.closeClick = function() {
                $scope.windowOptions.show = false;
            };



            $scope.addMarkerClickFunction = function(markers) {
                angular.forEach(markers, function(value, key) {
                    value.onClick = function() {
                        $scope.onClick(value);
                        $scope.MapOptions.markers.selected = value;
                    };
                });
            };



            $scope.MapOptions = {
                minZoom: 3,
                zoomControl: false,
                draggable: true,
                navigationControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                disableDoubleClickZoom: false,
                keyboardShortcuts: true,
                markers: {
                    selected: {}
                },
                styles: [{
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "transit",
                    elementType: "all",
                    stylers: [{
                        visibility: "off"
                    }]
                }],
            };


        };


        //IMPORTANT Change post URL to reletive link before build... '../phpCore/search.php'
        ///////////
        //TESTING URL http://localhost/blip/app/phpCore/search.php
        var getLocationResults = function(data) {
            var searchResults;
            var callSearch = $http.post('http://localhost/blip/app/phpCore/search.php', data)

            .success(function(data, status, headers, config) {
                    searchResult = data;
                    console.log(searchResult);
                    angular.forEach(data, function(value, key) {

                        var marker = makeMarker(value, key);

                        $scope.markers.push(marker);
                    });

                    $scope.addMarkerClickFunction($scope.markers);

                    $scope.filterSearchResult = searchResult;
                    console.log(status + ' - ' + "Success");
                })
                .error(function(data, status, headers, config) {
                    console.log(status + ' - ' + 'Error');
                });


};



        $scope.setFilterSetClass = function(filter, index) {
            $scope.getFilter(filter);
            setQuickFilterClass(index);
        };

        $scope.activeFilter = 0;
        var setQuickFilterClass = function(type) {
            $scope.activeFilter = type;
        };

        var makeMarker = function(value, key) {
            var iconImage;
            switch (value.CategoryName) {
                case 'Bar':
                    iconImage = 'images/map_icons/bar_icon.png';
                    break;
                case 'Restaurant':
                    iconImage = 'images/map_icons/resturant_icon.png';
                    break;
                case 'Supermarket':
                    iconImage = 'images/map_icons/shopping_icon.png';
                    break;
                case 'Other':
                    iconImage = 'images/map_icons/other_icon.png';
                    break;
                default:
                    iconImage = 'images/map_icons/other_icon.png';

            }


            var marker = {
                id: key,
                coords: {
                    latitude: value.MapLat,
                    longitude: value.MapLong
                },
                options: {
                    icon: iconImage,
                    animation: 2
                },
                data: {
                    name: value.LocationName,
                    category: value.CategoryName,
                    description: value.LocationDescription,
                    picture: value.LocationPic,
                    city: value.city,
                    distance: value.distance,
                    id: value.LocationID
                }

            };


            return marker;
        }


        $scope.getFilter = function(filter) {
            if (filter !== "All") {
                $scope.filterSearchResult = [];
                $scope.markers = [];
                angular.forEach(searchResult, function(value, key) {
                    if (value.CategoryName === filter) {
                        $scope.filterSearchResult.push(value);

                        var marker = makeMarker(value, key);
                        $scope.markers.push(marker);
                        $scope.addMarkerClickFunction($scope.markers);

                    }
                });

            } else {
                $scope.filterSearchResult = searchResult;
                angular.forEach(searchResult, function(value, key) {
                    var marker = makeMarker(value, key);

                    $scope.markers.push(marker);
                });

                $scope.addMarkerClickFunction($scope.markers);


            }


        };


$scope.storeFocusedResult = function(currentmarker) {
            //have to reformat the currentmarker object to how the individual business page will interpret it
            var data = {
                LocationID : currentmarker.data.id,
                MapLat : currentmarker.coords.latitude,
                MapLong : currentmarker.coords.longitude,
                LocationDescription : currentmarker.data.description,
                LocationName : currentmarker.data.name,
                LocationPic : currentmarker.data.picture,
                distance : currentmarker.data.distance,
                City : currentmarker.data.city,
                CategoryName: currentmarker.data.category

            };
            ResultPageState.SetPageState(data);
            console.log(data.LocationID);
            $location.path('LocationView');
        };

        $scope.markerPanel = function() {
            var iwOuter = $('.gm-style-iw');
            var iwBackground = iwOuter.prev();
            iwBackground.children(':nth-child(2)').css({'display' : 'none'});
            iwBackground.children(':nth-child(4)').css({'display' : 'none'});

            var iwCloseBtn = iwOuter.next();
            iwCloseBtn.remove();
        };
    }]);
