<?php

	//error_reporting(0);
	//Configure DATABASE

	require_once 'blip_4815162342_108.php';
	$conn = db_connect();
	//Start Script

	//Input variables from Angular
	$user = json_decode(file_get_contents("php://input"));
	$userID = (int)$user->id;
	$userNat = (int)$user->nat;
	$userName = $user->name;
	$userPic = $user->pic;
	$userEmail = $user->email;
	$userView = decbin($user->view);

	$update = updateUser($userID, $userNat, $userName, $userPic, $userEmail, $userView);

	function updateUser($userID, $userNat, $userName, $userPic, $userEmail, $userView) {
		global $conn;

		$updateQuery = mysqli_query($conn,
	    	"CALL UpdateUser('$userID', '$userNat', '$userName', '$userPic', '$userEmail', '$userView')") or die("Query fail: " . mysqli_error($conn));
	}

	mysqli_close($conn);
?>