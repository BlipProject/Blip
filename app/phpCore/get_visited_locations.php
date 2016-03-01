<?php

	//Configure DATABASE

	require_once 'blip_4815162342_108.php';

	$conn = db_connect();
	
	//Start Script

	//Input variables from Angular
	$user = json_decode(file_get_contents("php://input"));
	$userID = $user->ID;

	$visitedLocations = getVL($userID);

	function getVL($userID) {
		$resultsArray;
		global $conn;

		$search = mysqli_query($conn,
	    "CALL GetUserRatings('$userID')") or die("Query fail: " . mysqli_error($conn));

		while($row = $search->fetch_array(MYSQL_ASSOC)) {
            $resultsArray[] = $row;
	    }

	    $results = json_encode($resultsArray,true);
	    return $results;
	}

	//Return Query Result to Frontend
	echo $visitedLocations;

	mysqli_close($conn);

?>