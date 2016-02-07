//Sets the icon for current page in sidebar
//0 == List View
//1 == Map View

angular.module('blipApp')
	.factory('SideBarPageInView', function () {
		var page={};
		return{
			SetPage : function(pageIn){
				page.pageOn = pageIn;
			},
			GetPage : function(){
				return page.pageOn;
			}
		}
	});