<?php

	//Configure DATABASE

	require_once 'blip_4815162342_108.php';
	$conn = db_connect();
	//Start Script

	//Input variables from Angular
	$imgData = json_decode(file_get_contents("php://input"));
	$locationID = 	$imgData->location;
	$img = 	$imgData->img;

	if(file_exists("../images/busineses_dir/".$locationID)){}
	else { mkdir('../images/busineses_dir/'.$locationID, 0777, true); }

	$target_dir = "../images/busineses_dir/".$locationID."/".$locationID."_Thumb.png";

	file_put_contents($target_dir, base64_decode($img));

	mysqli_close($conn);
?>