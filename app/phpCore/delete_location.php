<?php

	//Configure DATABASE

	require_once 'blip_4815162342_108.php';
	$conn = db_connect();
	//Start Script

	//Input variables from Angular
	$location = json_decode(file_get_contents("php://input"));
	$locationID = 	$location->LocationID;

	$delete = deleteLocation($locationID);

	function deleteLocation($locationID) {
		global $conn;

		$deleteQuery = mysqli_query($conn,
	    	"CALL DeleteLocation('$locationID')") or die("Query fail: " . mysqli_error($conn));
	}

	mysqli_close($conn);
?>