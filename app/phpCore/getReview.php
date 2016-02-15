<?php
include('blip_4815162342_108.php');

$conn = mysqli_connect($servername, $username, $password, $db);
$MapLatt = $_GET['locationLat'];
$MapLongg = $_GET['locationLon'];
$userId = $_GET['userId'];

$searchResults = giveMeRating($MapLatt,$MapLongg, $userId);

	function giveMeRating($MapLatt,$MapLongg, $userId ) {
		$resultsArray;
		global $conn;
		$search = mysqli_query($conn, 
	    "CALL GetLocationRatings('$MapLatt','$MapLongg', '$userId')") or die("Query fail: " . mysqli_error($conn));
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