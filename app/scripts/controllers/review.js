 'use strict';
 angular.module('blipApp')
    .controller('ReviewCtrl', ['$http', '$scope', 'ResultPageState',function($http, $scope, ResultPageState) {
 var tUp;
        $(document).ready(function() {
        	//get user id from session
        	var userId = 321;
        	$scope.pageViewData = ResultPageState.GetPageState();
        	var locationId = $scope.pageViewData.LocationID;

        	$("#noComment").click(function()// when no comment is clicked
        	     {
                    document.getElementById("addingComments").className = "";
                    document.getElementById("addingComments").className += "ng-hide";
                     $.ajax({
		      url: 'http://localhost/blip/app/phpCore/sendReview.php',//the script to call to get data
		      data: {
		      userId:userId,
		      userTitle:'',
		      userComment:'',
		      locationId:"",
		      tUp:"",
		      },//you can insert url argumnets here to pass to review.php
		      type: 'get',
		      success: function(data)
		      {
		      	location.reload();
		      }
		     });  // end ajax
	         });// end click no comment

        $scope.addComment = function(userId, userTitle, userComment) {
           $.ajax({
		      url: 'http://localhost/blip/app/phpCore/sendReview.php',//the script to call to get data
		      data: {
		      userId:userId,
		      userTitle:userTitle,
		      userComment:userComment,
		      locationId:"",
		      tUp:"",
		      },//insert url argumnets here to pass to sendReview.php
		      type: 'get',
		      success: function(data)
		      {
		      	location.reload();
		      }
		  });  // end ajax
		 }; //end angular scope


        	$.ajax({
        	  //
		      url: 'http://localhost/blip/app/phpCore/getReview.php',//the script to call to get data
		      data: { locationId: locationId, userId: userId},     //you can insert url argumnets here to pass to review.php
		      type: 'get',                                        //for example "get"
		      dataType: 'json',                                   //data format
		      success: function(data)                             //on recieve of reply
		      {
		      	$('#countUp').html(data[0].ThumbsUp);
		      	$('#countDown').html(data[0].ThumbsDown);
		      	$('#usersName').html(data[0].AllComments);
		      	var counterUp = data[0].ThumbsUp;
 				var counterDown = data[0].ThumbsDown;
 				// check was user voting or not
 				if (data[0].UserVoted == 1)
 				{
 					$("#up").prop("disabled",true);
        	        $("#down").prop("disabled",true);
                }
	 			$("#up").click(function(){  // add one into thumb up  and disable btns
	                counterUp++;
	                $("#countUp").text(counterUp);
	                $("#up").prop("disabled",true);
        	        $("#down").prop("disabled",true);
                    document.getElementById("addingComments").className += "";
                    document.getElementById("addingComments").className += "ng-show";
                    tUp = true;
	            });// end thumb down

	             $("#down").click(function(){// add one into thumb down and disable btns
	                counterDown++;
	                $("#countDown").text(counterDown);
	                $("#up").prop("disabled",true);
        	        $("#down").prop("disabled",true);
        	        document.getElementById("addingComments").className += "";
                    document.getElementById("addingComments").className += "ng-show";
                    tUp = false;
	            });// end thumb down
		      }});// end ajax
        });//end ready function
    }]);// end controller

