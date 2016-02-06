<?php
	
	//Configure DATABASE

	include 'blip_4815162342_108.php';
	
	//Start Script

	//Input variables from Angular
	$user = json_decode(file_get_contents("php://input"));
	$userID = $user->ID;

	$conn = mysqli_connect($servername, $username, $password, $db);

	deleteLocation($userID);

	function deleteLocation($userID) {
		global $conn;

		mysqli_query($conn, 
	    "CALL DeleteLocation('$userID')") or die("Query fail: " . mysqli_error($conn));
	}

	mysqli_close($conn);
		
?>