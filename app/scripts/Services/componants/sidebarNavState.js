angular.module('blipApp')
	.factory('SideBarPageInView', function () {
		var page=0;
		var SetPage = function(pageIn){
			page = pageIn;
		};
		var GetPage = function(){
			return page;
		}
		return {page: page};
	});