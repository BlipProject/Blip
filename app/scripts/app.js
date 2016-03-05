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
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
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
      .when('/review', {
        templateUrl: 'views/review.html',
        controller: 'ReviewCtrl',
        controllerAs: 'review'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/LocationView', {
        templateUrl: 'views/IndividualResultPage.html',
        controller: 'IndividualResultPageCtrl',
        controllerAs: 'IRP'
      })
      .when('/facebookLogin', {
        templateUrl: 'views/facebookLogin.html',
        controller: 'FacebookLoginCtrl',
        controllerAs: 'facebookLogin'
      })
      .when('/userLocations', {
        templateUrl: 'views/userLocations.html'
      })
      .when('/visitedLocations', {
        templateUrl: 'views/visitedLocations.html',
        controller: 'VisitedLocationsCtrl',
        controllerAs: 'visitedLocations'
      })
      .otherwise({
        redirectTo: 'home.html'
      });
  })
 .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAQFytzAtci3uRV55raqL5qtq-yFwDZjIk',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})
.run(function($rootScope) {
  //Set state for mobile nav.
  //Hide on launch
  //Show on button click in nav.html
  $rootScope.animateIn = 'm-nav-wrapper-show animated slideInLeft';
  $rootScope.animateOut = 'animated slideOutLeft';
  $rootScope.toggleNavClass = $rootScope.animateOut;

  //COntrols what icon to show what page user is on
  $rootScope.mobileNavPageActive = 0;

  //Show loading animation -- sets to false when results are returned from server
  $rootScope.showLoadingAnimation = true;


  function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
  }

  $rootScope.userIdCookie = getCookie("userId");
  var userName = getCookie("userName");
  $rootScope.userNameCookie = userName.replace("+" , " ");
  $rootScope.userNatCookie = getCookie("userNat");

});