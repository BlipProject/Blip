<?php
error_reporting(0);

include('blip_4815162342_108.php');
$conn = db_connect();


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$LocationID = (int)$request->locationId;
$userId = (int)$request->userId;

$searchResults = giveMeComments($LocationID, $userId);

function giveMeComments($LocationID, $userId )
{
	$resultsArray;
	global $conn;
	$search = mysqli_query($conn,
    "CALL GetLocationComments('$LocationID', '$userId')") or die("Query fail: " . mysqli_error($conn));

	$num_rows = mysqli_num_rows($search);

	while($row = $search->fetch_array(MYSQL_ASSOC))
	{
        $resultsArray[] = $row;
    }

    if (count($resultsArray) == 0){
    	echo json_encode(array('error' => array(
			'message' => 'No results',
			'code' => 111,
		)));
		mysqli_close($conn);
		exit;
	}
	else{
	    echo json_encode($resultsArray,true);
	    mysqli_close($conn);
		exit;
	}
}

?>