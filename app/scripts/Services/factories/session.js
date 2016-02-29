angular.module('blipApp')
	.factory('Session', function($http) {
	    return $http.get('http://localhost/blip/app/phpCore/session.php').then(function(result) {
	        return result.data;
    });
});