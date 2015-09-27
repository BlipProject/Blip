'use strict';

angular.module('blipApp')
	.controller('LocationSearchCtrl', ['$scope', function ($scope) {

		//TEST DATA
		//Remove once server is hooked up
		var testData;
		this.testData = [
			{
				id:"0001",
				name:"Resteraunt1",
				description:"I am a test. Num1",
				location:"dublin",
			},
			{
				id:"0002",
				name:"Resteraunt2",
				description:"I am a test. Num2",
				location:"sligo",
			},
			{
				id:"0003",
				name:"Resteraunt3",
				description:"I am a test. Num3",
				location:"dublin",
			},
			{
				id:"0004",
				name:"Resteraunt4",
				description:"I am a test. Num4",
				location:"sligo",
			}];

		var results;
		this.results = [];

		this.setLocation = function(locationIn){
			this.results = [];
			//Pass variable // check against testData array
			//TODO Replace with http post to server

			for(var i=0;i<this.testData.length;i++)
			{
			//MySQL can handle the conversion to lowercase
			//TODO Inplement check on each letter with a delay (1 sec maybe) 

				if(this.testData[i].location === locationIn)
				{
					this.results.push(this.testData[i]);
				}
			}
			console.log("I work!!");
			console.log(results);
		};

}]);

