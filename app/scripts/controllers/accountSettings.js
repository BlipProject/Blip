'use strict';

angular.module('blipApp')
  .controller('AccountSettingsCtrl', ['$http',
  	'$scope',
  	'$rootScope',
    '$location',
  	function ($http, $scope, $rootScope, $location) {

        $scope.currentPath = $location.path();
        $scope.viewsList = [{ id: '0', view: 'List'}, {id: '1', view: 'Map' }];
        $scope.nationalities = JSON.parse(localStorage.cacheNat)

        $scope.userName = $rootScope.userNameCookie;
        $scope.originalPic = $rootScope.userPic;
        $scope.userPic = $rootScope.userPic;
        $scope.userNat = { NationalityName: $rootScope.userCountryCookie, NationalityID: $rootScope.userNatCookie };
        $scope.userEmail = $rootScope.userEmailCookie;

        if($rootScope.userViewCookie !== undefined) { $scope.userDefaultView = { id: $rootScope.userViewCookie }; }
        else { $scope.userDefaultView = { id: '0' }; }

        $scope.uploadImg = function() {

            $("#hiddenImgInput").trigger('click');

            $("#hiddenImgInput").change(function() {

                if(this.files && this.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                      $scope.userPic = e.target.result
                      $scope.$apply();
                    }
                    reader.readAsDataURL(this.files[0]);
                };
            });
        };

        $scope.updateProfile = function(userName, userNat, userEmail, userView) {
            console.log(userName, userNat, userEmail, userView);

            if($scope.userPic != $scope.originalPic) {

                var imgData = {
                    user: $rootScope.userIdCookie,
                    img: $scope.userPic.split(',')[1]
                }
                $http.post('http://localhost/blip/app/phpCore/upload_image.php', imgData);
                $scope.userPic = "images/user_dir/" + $rootScope.userIdCookie + "/" + $rootScope.userIdCookie + "_Thumb.png";
            }

            var user = {
                id: $rootScope.userIdCookie,
                nat: userNat.NationalityID,
                name: userName,
                pic: $scope.userPic,
                email: userEmail,
                view: userView.id,
            }
            console.log(user);
            $http.post('http://localhost/blip/app/phpCore/update_user.php', user)
                .then(function(response)
                {
                });
        };
  }]);