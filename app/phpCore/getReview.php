<?php
include('blip_4815162342_108.php');
$conn = db_connect();
/*
$LocationID = $_GET['locationId'];
$userId = $_GET['userId'];
*/
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$LocationID = $request->locationId;
$userId = $request->userId;

$searchResults = giveMeRating($LocationID, $userId);

	function giveMeRating($LocationID, $userId ) {
		$resultsArray=[];
		global $conn;
		$search = mysqli_query($conn,
	    "CALL GetLocationRatings('$LocationID', '$userId')") or die("Query fail: " . mysqli_error($conn));
		/*
		if (mysql_num_rows($search)==0){
			header('HTTP/1.1 500 Internal Server Booboo');
        	header('Content-Type: application/json; charset=UTF-8');
        	die(json_encode(array('message' => 'ERROR', 'code' => 1337)));
        	exit();
		}
		else{
			*/
			while($row = $search->fetch_array(MYSQL_ASSOC))
			{
	            $resultsArray[] = $row;
		    }
		    $results = json_encode($resultsArray,true);
		//}
	    return $results;
	}
	echo $searchResults;
	mysqli_close($conn);
?>