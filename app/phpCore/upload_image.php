<?php

	//Configure DATABASE

	require_once 'blip_4815162342_108.php';
	$conn = db_connect();
	//Start Script

	//Input variables from Angular
	$imgData = json_decode(file_get_contents("php://input"));
	$userID = 	$imgData->user;
	$img = 	$imgData->img;

	if(file_exists("../images/user_dir/".$userID)){}
	else { mkdir('../images/user_dir/'.$userID, 0777, true); }

	$target_dir = "../images/user_dir/".$userID."/".$userID."_Thumb.png";

	file_put_contents($target_dir, base64_decode($img));

	mysqli_close($conn);
?>