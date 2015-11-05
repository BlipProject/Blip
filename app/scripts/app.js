'use strict';

/**
 * @ngdoc overview
 * @name blipApp
 * @description
 * # blipApp
 *
 * Main module of the application.
 */
angular
  .module('blipApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'uiGmapgoogle-maps'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/landing.html',
      })
      .when('/searchResult', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/map', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl',
        controllerAs: 'map'
      })
      .when('/registerbusiness', {
        templateUrl: 'views/registerbusiness.html',
        controller: 'MapCtrl',
        controllerAs: 'map'
      })
      .when('/registerUser', {
        templateUrl: 'views/registerUser.html',
        controller: 'UserRegistrationCtrl',
        controllerAs: 'userReg'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: 'views/landing.html'
      });

  })
 .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAQFytzAtci3uRV55raqL5qtq-yFwDZjIk',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
});


 


