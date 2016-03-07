'use strict';

angular.module('blipApp')
	.service('CookieService',['$location', function ($location) {
		return{
			checkCookie: function(){

				function getCookie(name) {
			        var value = "; " + document.cookie;
			        var parts = value.split("; " + name + "=");
			        if (parts.length == 2) return parts.pop().split(";").shift();
			    }

				if( getCookie("userId") === null || getCookie("userName") === null || getCookie("userNat") === null || getCookie("userCountry") === null || getCookie("userCountryCode") === null){
					console.log("Redirected");
					window.location = "/index.html";
			    }
			}
		};
	}]);