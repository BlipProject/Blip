//Store the current state of the page
//If hoverOver result button is clicked takes the current result and stores it
//to be back by "IndividualResultPageCtrl"

angular.module('blipApp')
	.factory('ResultPageState', function () {
		var pageState={};
		return{
			SetPageState : function(locationIn){
				localStorage.pageState = JSON.stringify(locationIn);
			},
			GetPageState : function(){
				return JSON.parse(localStorage.pageState);
			}
		}
	});