<?php
include('blip_4815162342_108.php');

$conn = mysqli_connect($servername, $username, $password, $db);
//$user = json_decode(file_get_contents("php://input"));
//$userId = $user->id;
//$userName = $user->name;
///$userComment = $user->comment;

//////////////////////////////////////////////
//if(isset($_GET['locationLat']))
	//{
	    //$ble = $_GET['locationLat'];

	    // Do whatever you want with the $uid
	//}
	//$down = 123;
	//$arr = array($down,$MapLong );
	//$result = json_encode($arr,true);
	//Return Query Result to Frontend
	//echo $result; 
	//$somevar = $_GET['ble'];
    //$othervar = $_GET['bla'];
/////////////////////////////////////////////
    //potrzebne sproki
	//GetLocationRatings
	//InsertRating
	////////////////////////////////////
$MapLatt = $_GET['locationLat'];
$MapLongg = $_GET['locationLon'];
//koordynaty lidla
//$MapLatt = 54.26727676;
//$MapLongg = -8.46088123;
$searchResults = giveMeRating($MapLatt,$MapLongg);

	function giveMeRating($MapLatt,$MapLongg) {
		$resultsArray;
		global $conn;

		$search = mysqli_query($conn, 
	    "CALL GetLocationRatings('$MapLatt','$MapLongg')") or die("Query fail: " . mysqli_error($conn));

		while($row = $search->fetch_array(MYSQL_ASSOC)) {
            $resultsArray[] = $row;
	    }

	    $results = json_encode($resultsArray,true);
	    return $results;
	}

	//Return Query Result to Frontend
	echo $searchResults;
	mysqli_close($conn);
	/*
	/////////////////////////////////////
	$get = mysqli_query($conn, 
         "Call CheckActivationCodeArtur('$userEmail')") or die("Query fail: " . mysqli_error($conn));

	while ($row = mysqli_fetch_row($get))
	{ 
		$db_up = $row[0];
		$db_down = $row[1];
	} 

	if ($activation == $db_code && $userEmail == $db_email) 
	{
  		$conn = mysqli_connect($servername, $username, $password, $db);
		$move = mysqli_query($conn, 
       		"Call MoveIntoUsersArtur('$userEmail')") or die("Query fail: " . mysqli_error($conn));

 		echo "Account activated. We are going to redirect You now into Blip. Have fun!";

 		//LOCALHOST
 		header( "refresh:3;url = http://localhost:9000/#/" );
 		//header( "refresh:3;url = http://bliptest.azurewebsites.net/#/" );
	}
	else
	{
    	echo "Sorry activation time expired";
	}

	mysqli_close($conn);
//Configure DATABASE

	/*include 'blip_4815162342_108.php';
	
	//Start Script

	potrzebne sproki
	 
	GetLocationRatings
	InsertRating


	$conn = mysqli_connect($servername, $username, $password, $db);

//Input variables from Angular///////////////////
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);	
	$something = $request->something;
/////////////////////////////////////////////////


	$getRates = giveMeRates($thumbUp,$thumbDown);

	function giveMeRates($up,$down) {
		$resultsArray;
		global $conn;

		$search = mysqli_query($conn, 
	    "CALL sprawdz nazwe i wpisz ('$ip','$down')") or die("Query fail: " . mysqli_error($conn));

		while($row = $search->fetch_array(MYSQL_ASSOC)) {
            $resultsArray[] = $row;
	    }

	    $results = json_encode($resultsArray,true);
	    return $results;
	}

	//Return Query Result to Frontend
	echo $searchResults;
///////////////////////////////////////////////

	// cos do sprawdzenia bez bazy danych ? 

	$searchResults = searchLocation($test);

	function searchLocation($test) {
		$test=100;
	}
*/
	
?>