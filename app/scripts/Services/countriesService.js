'use strict';

angular.module('blipApp')
	.service('CountryService', function ($q, $rootScope, $http) {
		return{
			checkCountry: function(position){
	        	var latlng = {lat: parseFloat(position.latitude), lng: parseFloat(position.longitude)};

				var geocoder = new google.maps.Geocoder;
				geocoder.geocode({'location': latlng}, function(results, status) {
					results.forEach(function(res) {
						res.types.forEach(function(type){
							if(type == "country") {

								var userVisitedCountries;

								if($rootScope.userVisitedCookie != undefined) { 
									userVisitedCountries = $rootScope.userVisitedCookie.split("-"); 

									if($.inArray(res.address_components[0].short_name, userVisitedCountries) === -1) {
										var countries = $rootScope.userVisitedCookie + "-" + res.address_components[0].short_name;
										
										var data = {
											userID: parseInt($rootScope.userIdCookie),
											VisitedCountries: countries
										}

										var update = $http.post('http://localhost/blip/app/phpCore/update_visited_countries.php', data);
								        $rootScope.userVisitedCookie = countries;
									}
								}
								else { 
									var countries = res.address_components[0].short_name

									var data = {
											userID: parseInt($rootScope.userIdCookie),
											VisitedCountries: countries
										}

									var update = $http.post('http://localhost/blip/app/phpCore/update_visited_countries.php', data);
							        $rootScope.userVisitedCookie = countries;
								}
							}
						});
					});
				});
		    }
		};
	});