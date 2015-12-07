'use strict';

angular.module('blipApp')
  .controller('FacebookLoginCtrl', ['$scope' ,function ($scope, Facebook) {
$scope.pageHeading = "FACEBOOK LOGIN";
  	
  $scope.hello="Hi! Please";
  $scope.username="";

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '644506752358777',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
 

$scope.loginFacebookUser = function (nationality) {
      var userDetails = {
      nat:nationality
    };
    console.log(userDetails);
if (userDetails !== "") {

	document.getElementById("nationalityDD").className += " ng-hide";
	document.getElementById("finishReg").className += " ng-hide";
	}
};



  $scope.FBLogin = function(){

  	FB.login(function(response) {
    if (response.authResponse) {
     //console.log('Welcome!  ');

     FB.api('/me', { fields: 'name, email, picture' },function(response) {
     	
       console.log('Good to see you, ' + response.name + '.');
       console.log(response.picture.data.url);
 
        $scope.$apply(function() {
       	$scope.hello="Good to see you";
        $scope.username = response.name;
        document.getElementById("hide").className += " ng-hide";
        document.getElementById("nationalityDD").className = "";
        document.getElementById("finishReg").className = "";
        var profileImg = response.picture.data.url;
		    document.getElementById('profilePicture').innerHTML = '<img src="' + profileImg + '" />';
        
      });

       
       var accessToken = FB.getAuthResponse().accessToken;
       console.log(accessToken);
     }); 
    } 
    else 
    {
     console.log('User cancelled login or did not fully authorize.');
    }

	});

  };

}]);
