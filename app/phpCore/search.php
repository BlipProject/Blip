<?php
	
	//Configure DATABASE

	include 'blip_4815162342_108.php';
	
	//Start Script

	//Input variables from Angular
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$longitude = $request->longitude;
	$latitude = $request->latitude;

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
	
