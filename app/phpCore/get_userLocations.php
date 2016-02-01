<?php
	
	//Configure DATABASE

	include 'blip_4815162342_108.php';
	
	//Start Script

	//Input variables from Angular
	$user = json_decode(file_get_contents("php://input"));
	$userID = $user->ID;

	$conn = mysqli_connect($servername, $username, $password, $db);

	$userLocations = getUL($userID);

	function getUL($userID) {
		$resultsArray;
		global $conn;

		$search = mysqli_query($conn, 
	    "CALL GetUserLocations('$userID')") or die("Query fail: " . mysqli_error($conn));

		while($row = $search->fetch_array(MYSQL_ASSOC)) {
            $resultsArray[] = $row;
	    }

	    $results = json_encode($resultsArray,true);
	    return $results;
	}

	//Return Query Result to Frontend
	echo $userLocations;