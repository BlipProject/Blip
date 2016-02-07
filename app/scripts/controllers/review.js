 'use strict';
 angular.module('blipApp')
    .controller('ReviewCtrl', ['$http', '$scope', 'ResultPageState',function($http, $scope, ResultPageState) {
 
        $(document).ready(function() {
        	//$scope.addingComments = false;
  /*
 //////////////////////////////////////////////////////////////////////////////////////////
moze byc potrzebne do komentarzy 
//$('#output').html("<b>id: </b>"+id+"<b> name: </b>"+vname); //Set output element html
		        //recommend reading up on jquery selectors they are awesome 
		        // http://api.jquery.com/category/selector
//////////////////////////////////////////////////////////////////////////////////////////
  $scope.addComment = function(userId, userName, userComment) {
            //all ok
            var userDetails = {
            	id: userId,
                name: userName,
                comment: userComment
            };
            //console.log(userDetails);
            //LOCALHOST            
            //var postReg = $http.post('http://bliptest.azurewebsites/blip/app/phpCore/review.php', userDetails)
            var postReg = $http.post('http://localhost/blip/app/phpCore/review.php', userDetails)
                .success(function(data, status, headers, config) {
                    alert("Success");
                    location.reload();
                    //console.log(status + ' - ' + "Success");        
                })
                .error(function(data, status, headers, config) {
                    //console.log(status + ' - ' + 'Error');
                });
        }; */
        	// bedzie potrzebne jak user bedzie juz mial juz dodany comment.. 
        	
        	 // bedzie potrzebne do wpisywania komentarzy 
        	 $('#usersName').html("Artur " + "06/02/2016" + "\n" + "Ble ble ble....");
        	$scope.pageViewData = ResultPageState.GetPageState();
        	//console.log(ResultPageState.GetPageState());
        	//console.log($scope.pageViewData.MapLat);
        	//console.log($scope.pageViewData.MapLong);
        	// I am using Brian Factory resultPageState
        	// if we could change Brian query "30Nearest" to get location ID it would make code easy 
        	var lat = $scope.pageViewData.MapLat;
        	var lon = $scope.pageViewData.MapLong;
        	
        	$.ajax({
        	  //                                       
		      url: 'http://localhost/blip/app/phpCore/review.php',//the script to call to get data          
		      data: { locationLat : lat , locationLon : lon},     //you can insert url argumnets here to pass to review.php
		      type: 'get',                                        //for example "get"
		      dataType: 'json',                                   //data format      
		      success: function(data)                             //on recieve of reply
		      {		
		      	$('#countUp').html(data[0].ThumbsUp);
		      	$('#countDown').html(data[0].ThumbsDown);

		      	var counterUp = data[0].ThumbsUp;
 				var counterDown = data[0].ThumbsDown; 

	 			$("#up").click(function(){            	
	                counterUp++;
	                $("#countUp").text(counterUp);
	                $("#up").prop("disabled",true);
        	        $("#down").prop("disabled",true);
        	        $scope.addingComments = true;
	                //$scope.test = data;
	               //alert($scope.searchResult);

	            });// end thumb down 

	            // add one into thumb down 
	             $("#down").click(function(){
	                counterDown++;	    
	                $("#countDown").text(counterDown);
	                $("#up").prop("disabled",true);
        	        $("#down").prop("disabled",true);
        	        $scope.addingComments = true;
	            });// end thumb down 
		      }});// end ajax
        });//end ready function 
    }]);// end controller

