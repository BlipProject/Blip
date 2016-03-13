 'use strict';
 angular.module('blipApp')
     .controller('ReviewCtrl', ['$http', '$scope', 'ResultPageState', '$rootScope', function($http, $scope, ResultPageState, $rootScope) {

         var tUp;
         //get language id from session

         var language = ($rootScope.userCountryCodeCookie).toLowerCase();
         $scope.userCountry = $rootScope.userCountryCookie;
         //get user id from session
         var userId = $rootScope.userIdCookie;
         $scope.userNat = $rootScope.userNatCookie;
         $scope.pageViewData = ResultPageState.GetPageState();

         var locationId = $scope.pageViewData.LocationID;
         $scope.comments = {};

         //Controls whether to show comment submit box
         $scope.ifReview = true;
         //Stores count of rateUp/rateDown
         $scope.thumbsUpCount=0;
         $scope.thumbsDownCount=0;


         $scope.translateComments = function(index) {
             var comment = $scope.comments[index];

             var data = { language: language, comment: comment.CommentText, title: comment.CommentTitle };
             var getComments = $http.post('http://localhost/blip/app/phpCore/translate.php', data)
                 .success(function(data, status, headers, config) {
                     $scope.comments[index].CommentText = data.comment[0];
                     $scope.comments[index].CommentTitle = data.title[0];
                 })
                 .error(function(data, status, headers, config) {
                     console.log('Error');
                 });
         }; // end translateComments

         $scope.commentError = false;

         $scope.getComments = function() {
             var data = { locationId: locationId, userId: userId };
             var getComments = $http.post('http://localhost/blip/app/phpCore/getComments.php', data)
                 .success(function(data, status, headers, config) {
                     if (data.hasOwnProperty('error')) {
                         $scope.commentError = true;
                     } else {
                         $scope.comments = data;
                         $scope.commentError = false;
                         checkReviewSet($scope.comments);
                     }
                 })
                 .error(function(data, status, headers, config) {
                     //console.log(error);
                 });
         };

         $scope.addComment = function(rating, commentTitle, commentText) {
             var data = { userId: userId, userTitle: commentTitle, userComment: commentText, locationId: locationId, tUp: rating };
             console.log(data);
             var getComments = $http.post('http://localhost/blip/app/phpCore/sendReview.php', data)
                 .success(function(data, status, headers, config) {
                     $scope.getComments();
                     checkReviewSet($scope.comments);
                 })
                 .error(function(data, status, headers, config) {
                     //console.log('Error');
                 });

         };


         $scope.init = $scope.getComments();

        function checkReviewSet(reviews) {
            $scope.thumbsUpCount = 0;
            $scope.thumbsDownCount = 0;
            for (var i = 0; i < reviews.length; i++) {
                if (reviews[i].ThumbsUp == 1)
                    $scope.thumbsUpCount++;
                else
                    $scope.thumbsDownCount++;

                if (reviews[i].UserID == userId)
                    $scope.ifReview = false;
            }
            starRating();
        }

        //When called calculates a star rating based of number of thumbsup/thumbsdown comments
        function starRating(){
            //Calculate maximum score possible (total * 5 stars)
            var topRating = ($scope.thumbsUpCount + $scope.thumbsDownCount) * 5;
            //Calcumalte value of thumbs up and thumbs down
            var ratingsAdded = ($scope.thumbsUpCount * 5) + ($scope.thumbsDownCount * 1);
            //Caculate rating value
            var rating = (ratingsAdded/topRating).toFixed(1);
            var repeatNum;
            var starRating="";

            if(rating == 1 || rating == .9)
                repeatNum = 5;
            else if (rating == .8 || rating == .7)
                repeatNum = 4;
            else if (rating == .6 || rating == .5)
                repeatNum = 3;
            else if (rating == .4 || rating == .3)
                $srepeatNum = 2;
            else if (rating == .2 || rating == .1)
                repeatNum = 1;

            for(var i = 0; i < repeatNum; i++){
                starRating+='<i class="fa fa-star fa-2x"></i>';
            }
            document.getElementById('starRating').innerHTML = starRating;
        };

     }]); // end controller
