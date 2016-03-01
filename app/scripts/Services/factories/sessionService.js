angular.module('blipApp')
	.service('SessionService', function ($http,$q) {
		return{
			SessionService: function(){
				var deferred = $q.defer();

				$http.get('http://localhost/blip/app/phpCore/session.php')
					.success(function (data, status, headers, config) {
		            	deferred.resolve(data);
		            	console.log("Hello");
		         	})
		         	.error(function(data, status, headers, config){
		            	deferred.reject("An error occured");
		        	});
			    return deferred.promise;
			}
		};
	});