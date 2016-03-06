<?php
include('blip_4815162342_108.php');
$conn = db_connect();
/*
$UserID = $_GET['userId'];
$CommentTitle = $_GET['userTitle'];
$CommentText = $_GET['userComment'];
$LocationID = $_GET['locationId'];
$Rating = $_GET['tUp'];
*/
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$UserID  = $request->userId;
$CommentTitle= $request->userTitle;
$CommentText= $request->userComment;
$LocationID= $request->locationId;
$Rating= $request->tUp;

//echo $UserID; // back to js


$sql = mysqli_query($conn,
   "Call InsertRating( '$LocationID', '$UserID' , '$CommentTitle', '$CommentText', $Rating)") or die("Query fail: " . mysqli_error($conn));
$conn->close();
?>