<?php
require_once 'blip_4815162342_108.php';

$UserID = $_GET['userId'];
$CommentTitle = $_GET['userTitle'];
$CommentText = $_GET['userComment'];
$LocationID = $_GET['locationId'];

$Rating = $_GET['tUp'];
echo $UserID; // back to js

$sql = mysqli_query($conn,
       "Call InsertRating( '$LocationID', '$UserID' , '$CommentTitle', '$CommentText', $Rating)") or die("Query fail: " . mysqli_error($conn));
	$conn->close();
?>