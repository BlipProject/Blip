 'use strict';
 angular.module('blipApp')
     .controller('ReviewCtrl', ['$http', '$scope', 'ResultPageState', '$rootScope', function($http, $scope, ResultPageState, $rootScope) {

         var tUp;
         //get language id from session
         var language = 'ar';
         //get user id from session
         var userId = 321;
         $scope.pageViewData = ResultPageState.GetPageState();
         console.log($scope.pageViewData);
         var locationId = $scope.pageViewData.LocationID;
         $scope.comments = {};

         /*
         $(document).ready(function() {
             $("#noComment").click(function() // when no comment is clicked
                 {
                     document.getElementById("addingComments").className = "";
                     document.getElementById("addingComments").className += "ng-hide";
                     $.ajax({
                         url: 'http://localhost/blip/app/phpCore/sendReview.php', //the script to call to get data
                         data: { userId: userId, userTitle: '', userComment: '', locationId, tUp }, //you can insert url argumnets here to pass to review.php
                         type: 'get',
                         success: function(data) {
                             location.reload();
                         }
                     }); // end ajax
                 }); // end click no comment

             $scope.addComment = function(userId, userTitle, userComment) {
                 $.ajax({
                     url: 'http://localhost/blip/app/phpCore/sendReview.php', //the script to call to get data
                     data: { userId: userId, userTitle: userTitle, userComment: userComment, locationId, tUp }, //insert url argumnets here to pass to sendReview.php
                     type: 'get',
                     success: function(data) {
                         location.reload();
                     }
                 }); // end ajax
             }; //end angular scope

             $.ajax({
                 url: 'http://localhost/blip/app/phpCore/getReview.php', //the script to call to get data
                 data: { locationId: locationId, userId: userId }, //you can insert url argumnets here to pass to review.php
                 type: 'get', //for example "get"
                 dataType: 'json', //data format
                 success: function(data) //on recieve of reply
                     {
                         $('#countUp').html(data[0].ThumbsUp);
                         $('#countDown').html(data[0].ThumbsDown);
                         //$('#usersName').html(data[0].AllComments);
                         var counterUp = data[0].ThumbsUp;
                         var counterDown = data[0].ThumbsDown;
                         // check was user voting or not
                         if (data[0].UserVoted == 1) {
                             $("#up").prop("disabled", true);
                             $("#down").prop("disabled", true);
                         }
                         $("#up").click(function() { // add one into thumb up  and disable btns
                             counterUp++;
                             $("#countUp").text(counterUp);
                             $("#up").prop("disabled", true);
                             $("#down").prop("disabled", true);
                             document.getElementById("addingComments").className += "";
                             document.getElementById("addingComments").className += "ng-show";
                             tUp = true;
                         }); // end thumb down

                         $("#down").click(function() { // add one into thumb down and disable btns
                             counterDown++;
                             $("#countDown").text(counterDown);
                             $("#up").prop("disabled", true);
                             $("#down").prop("disabled", true);
                             document.getElementById("addingComments").className += "";
                             document.getElementById("addingComments").className += "ng-show";
                             tUp = false;
                         }); // end thumb down
                     }
             }).complete(function() {
                 getComments();

             }); // end ajax
         }); //end ready function
         var allComments = "";
         /*
         function getComments() {
             $.ajax({
                 url: 'http://localhost/blip/app/phpCore/getComments.php',
                 data: { locationId: locationId, userId: userId },
                 type: 'get',
                 dataType: 'json',
                 success: function(data) {
                     allComments = data;
                     $scope.comments = data;
                     console.log(data);
                     //$('#usersName').append(JSON.stringify(data));
                 }
             })

             .complete(function() {
                 for (var i = 0; i < allComments.length; i++) {
                     translateComments(allComments[i]);
                 }
             }); // end ajax

         } //end get comments
         */
         $scope.translateComments = function(index) {
             var comment = $scope.comments[index];

             var data = { language: language, comment: comment.CommentText, title: comment.CommentTitle };
             var getComments = $http.post('http://localhost/blip/app/phpCore/translate.php', data)
                 .success(function(data, status, headers, config) {
                     console.log(data);
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
             console.log(data);
             var getComments = $http.post('http://localhost/blip/app/phpCore/getComments.php', data)
                 .success(function(data, status, headers, config) {
                    if(data.hasOwnProperty('error')){
                        console.log(data.error.code);
                        $scope.commentError = true;
                    }
                    else {
                        $scope.comments = data;
                        console.log($scope.comments);
                        $scope.commentError = false;
                    }
                 })
                 .error(function(data, status, headers, config) {
                     //console.log(error);
                 });
         };

         $scope.addComment = function(rating) {
             var title = document.getElementById('tbxReviewTitle');
             var comment = document.getElementById('tblkReviewComment');

             var data = { userId: userId, userTitle: title, userComment: comment, locationId: locationId, tUp: rating };
             var getComments = $http.post('http://localhost/blip/app/phpCore/sendReview.php', data)
                 .success(function(data, status, headers, config) {
                     $scope.getComments();
                 })
                 .error(function(data, status, headers, config) {
                     //console.log('Error');
                 });

         };

         $scope.init = $scope.getComments();

     }]); // end controller
