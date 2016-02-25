<?php

	//Configure DATABASE

	require_once 'blip_4815162342_108.php';
	$conn = db_connect();
	//Start Script


	$nationalities = getNats();

	function getNats() {
		$resultsArray;
		global $conn;

		$search = mysqli_query($conn,
	    "CALL GetNationalities()") or die("Query fail: " . mysqli_error($conn));

		while($row = $search->fetch_array(MYSQL_ASSOC)) {
            $resultsArray[] = $row;
	    }

	    $results = json_encode($resultsArray,true);
	    return $results;
	}

	//Return Query Result to Frontend
	echo $nationalities;

	mysqli_close($conn);

?>