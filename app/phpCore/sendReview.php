<?php
error_reporting(0);
require_once 'blip_4815162342_108.php';
$conn = db_connect();

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$UserID  = (int)$request->userId;
$CommentTitle= $request->userTitle;
$CommentText= $request->userComment;
$LocationID= (int)$request->locationId;
$Rating= $request->tUp;
/*
echo $UserId;
echo $CommentTitle;
echo $CommentText;
echo $LocationID;
echo $Rating;
*/
$sql = mysqli_query($conn,
   "Call InsertRating( $LocationID, $UserID , '$CommentTitle', '$CommentText', $Rating)") or die("Query fail: " . mysqli_error($conn));
$conn->close();
?>