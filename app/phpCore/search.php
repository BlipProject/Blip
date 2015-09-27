<?php
	/*$servername = "localhost";
	$username = "root";
	$password = "";
	$db = "search_test";*/

	$servername = "eu-cdbr-azure-north-d.cloudapp.net";
	$username = "bd90192c1a23ec";
	$password = "bfbfe307";
	$db = "as_64dd0e9989faa02";

	$conn = mysqli_connect($servername, $username, $password, $db);

	function searchLocation($location) {

		global $conn;

		$search = mysqli_query($conn, 
	    "CALL LocationsByCity('$location')") or die("Query fail: " . mysqli_error($conn));

		while($row = $search->fetch_array(MYSQL_ASSOC)) {
            $resultsArray[] = $row;
	    }

	    $jsonResults = json_encode($resultsArray);

	    return $jsonResults;
	}

	$searchResults = searchLocation("sligo");
	echo $searchResults;
?>