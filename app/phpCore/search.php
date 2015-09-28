<?php
	
	//TEST DATABASE
	$servername = "localhost";
	$username = "root";
	$password = "";
	$db = "search_test";
	
	/*
	//LIVE DATABASE
	$servername = "eu-cdbr-azure-north-d.cloudapp.net";
	$username = "bd90192c1a23ec";
	$password = "bfbfe307";
	$db = "as_64dd0e9989faa02";
	*/

	//Input variable from Angular
	$postdata = file_get_contents("php://input");
	
	$conn = mysqli_connect($servername, $username, $password, $db);

	$searchResults = searchLocation($postdata);

	function searchLocation($location) {
		$resultsArray = "";
		global $conn;

		$search = mysqli_query($conn, 
	    "CALL LocationsByCity('$location')") or die("Query fail: " . mysqli_error($conn));

		while($row = $search->fetch_array(MYSQL_ASSOC)) {
            $resultsArray[] = $row;
	    }

	    $results = json_encode($resultsArray,true);
	    return $results;
	}

	//Return Query Result to Frontend
	echo $searchResults;
	
?>