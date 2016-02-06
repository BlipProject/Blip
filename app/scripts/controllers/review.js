 'use strict';
 angular.module('blipApp')
    .controller('ReviewCtrl', ['$http', '$scope', 'ResultPageState',function($http, $scope, ResultPageState) {
        //$scope.pageHeading = "User Registration";




 var counter = 0;
 var counterr = 0;
    // to jest servis wracajacy data ze strony ph[ ? ]
        $(document).ready(function() {

        	//$scope.pageViewData = ResultPageState.GetPageState();
//ResultPageState.SetPageState($scope.filterSearchResult[index]);
 //alert($scope.pageViewData);

        	//console.log($scope);pageViewData.LocationName
        	//console.log($scope.pageViewData.LocationName);
        	//console.log(ResultPageState.GetPageState);

        	$.ajax({                                      
		      url: 'http://localhost/blip/app/phpCore/review.php',                  //the script to call to get data          
		      data: { locationID : 7 },                        //you can insert url argumnets here to pass to api.php
		      type: 'get',                                //for example "id=5&parent=6"
		      dataType: 'json',                //data format      
		      success: function(data)          //on recieve of reply
		      {		      	
		      	$('#countUp').html(data[0]);
		      	$('#countDown').html(data[1]);
		      	//alert(data);
		        //var id = data[0];              //get id
		        //var vname = data[1];           //get name
		        //--------------------------------------------------------------------
		        // 3) Update html content
		        //--------------------------------------------------------------------
		        //$('#output').html("<b>id: </b>"+id+"<b> name: </b>"+vname); //Set output element html
		        //recommend reading up on jquery selectors they are awesome 
		        // http://api.jquery.com/category/selectors/
		      } 
		    });
 // add one into thumb up
            $("#up").click(function(){            	
                counter++;
    
                $("#countUp").text(counter);
                
                //$scope.test = data;
               //alert($scope.searchResult);

            });
			// end thumb down 

            // add one into thumb down 
             $("#down").click(function(){
                counterr++;
    
                $("#countDown").text(counterr);
            });
             // end thumb down 
/*
			var params = "1";
			alert(1);
		    var httpc = new XMLHttpRequest(); // simplified for clarity
		    var url = "review.php";
		    httpc.open("POST", url, true); // sending as POST

		    httpc.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		    httpc.setRequestHeader("Content-Length", params.length); // POST request MUST have a Content-Length header (as per HTTP/1.1)

		    httpc.onreadystatechange = function() { //Call a function when the state changes.
		    if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
		        alert(httpc.responseText); // some processing here, or whatever you want to do with the response
		        }
		    }
		    else alert(99);
		    httpc.send(params);

*/
        	////////////////////////////
        	/*
angular.module('blipApp')
	.service('SearchServices',['$http', function ($http,data,$q) {
		return{

			///////////
			//IMPORTANT Change post URL to reletive link before build... '../phpCore/search.php'
			///////////
			//TESTING URL http://localhost/blip/app/phpCore/search.php
			
			getLocationResults: function(data){
				return $http.post('http://localhost/blip/app/phpCore/review.php', data)
			        .then(function(response)
			        {
			        	console.log("Success");
			        	console.log(response.data);
			        	return response.data;  
		            });
			}
		};
	}]);
        	////////////////////////////
        	/////////////////////////////
        	// to juz bylo w pliku js 

var returnSearchResults = function(geoData) {
            SearchServices.getLocationResults(geoData).then(function(data) {
                $scope.searchResult = data;
                $scope.filterSearchResult = $scope.searchResult;
                $scope.showLoadingAnimation = false;
                console.log("SearchServices called succesfully");
            });
        };
        	///////////////////////////////

				*/
        });//end ready function 
    }]);

