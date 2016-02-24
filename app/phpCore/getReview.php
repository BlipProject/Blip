<?php
require_once 'blip_4815162342_108.php';

$LocationID = $_GET['locationId'];
$userId = $_GET['userId'];

$searchResults = giveMeRating($LocationID, $userId);

	function giveMeRating($LocationID, $userId ) {
		$resultsArray;
		global $conn;
		$search = mysqli_query($conn,
	    "CALL GetLocationRatings('$LocationID', '$userId')") or die("Query fail: " . mysqli_error($conn));
		while($row = $search->fetch_array(MYSQL_ASSOC))
		{
            $resultsArray[] = $row;
	    }
	    $results = json_encode($resultsArray,true);
	    return $results;
	}
	//Return Query Result to Frontend
	echo $searchResults;
	mysqli_close($conn);
?>