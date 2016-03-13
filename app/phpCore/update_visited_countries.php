<?php

	//error_reporting(0);
	//Configure DATABASE

	require_once 'blip_4815162342_108.php';
	$conn = db_connect();
	//Start Script

	//Input variables from Angular
	$data = json_decode(file_get_contents("php://input"));
	$userID = (int)$data->userID;
	$countries = $data->VisitedCountries;

	$update = updateUserCountries($userID, $countries);

	function updateUserCountries($userID, $countries) {
		global $conn;

		$updateQuery = mysqli_query($conn,
	    	"CALL UpdateUserVisited('$userID', '$countries')") or die("Query fail: " . mysqli_error($conn));
	}

	mysqli_close($conn);
?>