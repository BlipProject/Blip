<?php
//Configure DATABASE

	/*include 'blip_4815162342_108.php';
	
	//Start Script

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
	if(isset($_GET['locationID']))
	{
	    $lid = $_GET['locationID'];

	    // Do whatever you want with the $uid
	}
	$down = 123;
	$arr = array($lid,$down);
	$result = json_encode($arr,true);
	//$result = rtrim(implode(',', $arr), ',');
	//$searchResults = $lid;
	//Return Query Result to Frontend
	echo $result;
?>