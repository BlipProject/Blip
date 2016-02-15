<?php
include('blip_4815162342_108.php');
$UserID = $_GET['userId'];
$CommentTitle = $_GET['userTitle'];
$CommentText = $_GET['userComment'];

//$MapLat = $_GET['lat'];
//$MapLong = $_GET['lon'];
$LocationID = $_GET['locationId'];

$Rating = $_GET['tUp'];
echo $UserID; // back to js
		  
$conn = mysqli_connect($servername, $username, $password, $db);
	
	$sql = mysqli_query($conn, 
	       "Call InsertRating( '$LocationID', '$UserID' , '$CommentTitle', '$CommentText', $Rating)") or die("Query fail: " . mysqli_error($conn));
		$conn->close();
?>