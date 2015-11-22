'use strict';

angular.module('blipApp')
	.service('PopulateCountryDropdown',['$http', function ($http,data,$q) {
		return{
			getNationalities: function(){
				return $http.post('http://localhost/blip/app/phpCore/get_nationalities.php', data)
			        .then(function(response)
			        {
			        	console.log("Success");
			        	return response.data;     
		            });
			}
		};
	}]);