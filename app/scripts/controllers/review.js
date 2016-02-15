 'use strict';
 angular.module('blipApp')
    .controller('ReviewCtrl', ['$http', '$scope', 'ResultPageState',function($http, $scope, ResultPageState) {
 var tUp;
        $(document).ready(function() {
        	//get user id from session
        	// comment b4 start 
        	var userId = 321;
        	$scope.pageViewData = ResultPageState.GetPageState();
        	// I am using Brian Factory resultPageState
        	// if we could change Brian query "30Nearest" to get location ID it would make code easy 
        	var lat = $scope.pageViewData.MapLat;
        	var lon = $scope.pageViewData.MapLong;

        	$("#noComment").click(function()// no comment 
        	     {  
                    document.getElementById("addingComments").className = "";
                    document.getElementById("addingComments").className += "ng-hide";
                     $.ajax({                           
		      url: 'http://localhost/blip/app/phpCore/sendReview.php',//the script to call to get data          
		      data: { 
		      userId:userId,
		      userTitle:'',
		      userComment:'',
		      lat,
		      lon,
		      tUp
		      },//you can insert url argumnets here to pass to review.php
		      type: 'get',
		      success: function(data)
		      {
		      	location.reload();
		      } 
		     });  // end ajax  
	         });// end click no comment 
        	
        $scope.addComment = function(userId, userTitle, userComment) {
           $.ajax({        // TO DO LIFE ADDRESS                   
		      url: 'http://localhost/blip/app/phpCore/sendReview.php',//the script to call to get data          
		      data: { 
		      userId:userId,
		      userTitle:userTitle,
		      userComment:userComment,
		      lat,
		      lon,
		      tUp
		      },//insert url argumnets here to pass to review.php
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
		      data: { locationLat : lat , locationLon : lon, userId: userId},     //you can insert url argumnets here to pass to review.php
		      type: 'get',                                        //for example "get"
		      dataType: 'json',                                   //data format      
		      success: function(data)                             //on recieve of reply
		      {		
		      	$('#countUp').html(data[0].ThumbsUp);//insert thumbs up can b angular just 4 now 
		      	$('#countDown').html(data[0].ThumbsDown);// insert thumb down can b angular just 4 now 
		      	$('#usersName').html(data[0].AllComments);// insert commment can b angular just 4 now 
		      	var counterUp = data[0].ThumbsUp;
 				var counterDown = data[0].ThumbsDown;
 				// get user id from locationrating
 				// czeck was user voting or not 
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

