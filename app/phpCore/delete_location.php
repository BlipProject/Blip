<?php
	
	//Configure DATABASE

	include 'blip_4815162342_108.php';
	
	//Start Script

	//Input variables from Angular
	$location = json_decode(file_get_contents("php://input"));
	$locationID = 	$location->LocationID;

	$conn = mysqli_connect($servername, $username, $password, $db);

	$delete = deleteLocation($locationID);

	function deleteLocation($locationID) {
		global $conn;

		$deleteQuery = mysqli_query($conn, 
	    	"CALL DeleteLocation('$locationID')") or die("Query fail: " . mysqli_error($conn));
	}

	mysqli_close($conn);		
?>