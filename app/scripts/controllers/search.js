'use strict';

angular.module('blipApp')
	
	.controller('LocationSearchCtrl', ['$http','$scope', function ($http,$scope) {
		var setLocation = "";
		var searchResult;
		this.searchResult=[{"LocationID":"1","LocationName":"Sligo","LocationDescription":"Location1","LocationLat":"1234","LocationLong":"5678","LocName":"Aldi"},{"LocationID":"3","LocationName":"Sligo","LocationDescription":"Location3","LocationLat":"2568","LocationLong":"2548","LocName":"Tesco"}];


		//TODO Change post URL to reletive link
		this.setLocation = function(searchCity){
			var search = $http.post('http://localhost/blip/app/phpCore/search.php', searchCity)
		        .success(function(data, status, headers, config)
		        {
				    console.log( status + ' - ' + "Success");
		            searchResult = JSON.stringify(data);
		            console.log(searchResult);            
	            })
		        .error(function(data, status, headers, config)
		        {
		            console.log('error');
		        });
		};
}]);

