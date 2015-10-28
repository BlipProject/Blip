<?php
	
	//Configure DATABASE

	//LIVE DATABASE
	$servername = "eu-cdbr-azure-north-d.cloudapp.net";
	$username = "bd90192c1a23ec";
	$password = "bfbfe307";
	$db = "as_64dd0e9989faa02";
	
	//Start Script

	//Input variables from Angular
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$latitude = $request->latitude;
	$longitude = $request->longitude;

	$conn = mysqli_connect($servername, $username, $password, $db);


	$searchResults = searchLocation($latitude,$longitude);

	function searchLocation($lat,$long) {
		$resultsArray;
		global $conn;

		$search = mysqli_query($conn, 
	    "CALL 30Nearest('$lat','$long')") or die("Query fail: " . mysqli_error($conn));

		while($row = $search->fetch_array(MYSQL_ASSOC)) {
            $resultsArray[] = $row;
	    }

	    $results = json_encode($resultsArray,true);
	    return $results;
	}

	//Return Query Result to Frontend
	echo $searchResults;
	
?>
