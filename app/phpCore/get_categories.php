<?php
	
	//Configure DATABASE

	include 'blip_4815162342_108.php';
	
	//Start Script

	$conn = mysqli_connect($servername, $username, $password, $db);


	$categories = getCats();

	function getCats() {
		$resultsArray;
		global $conn;

		$search = mysqli_query($conn, 
	    "CALL GetCategories()") or die("Query fail: " . mysqli_error($conn));

		while($row = $search->fetch_array(MYSQL_ASSOC)) {
            $resultsArray[] = $row;
	    }

	    $results = json_encode($resultsArray,true);
	    return $results;
	}

	//Return Query Result to Frontend
	echo $categories;

	mysqli_close($conn);
		
?>