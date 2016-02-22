<?php 
include('blip_4815162342_108.php');
$conn = mysqli_connect($servername, $username, $password, $db);


$LocationID = $_GET['locationId'];
$userId = $_GET['userId'];

$searchResults = giveMeComments($LocationID, $userId);

	function giveMeComments($LocationID, $userId ) 
	{
		$resultsArray;
		global $conn;
		$search = mysqli_query($conn, 
	    "CALL GetLocationComments('$LocationID', '$userId')") or die("Query fail: " . mysqli_error($conn));
		while($row = $search->fetch_array(MYSQL_ASSOC)) 
		{
            $resultsArray[] = $row;
	    }
	    $results = json_encode($resultsArray,true);
	    return $results;
	}
	echo $searchResults;
	mysqli_close($conn);

	?>