<?php

	///Configure DATABASE

	include 'blip_4815162342_108.php';
	
	//Start Script


	echo("Script Called ( . )( . )");
	//Input variables from Angular
	$business = json_decode(file_get_contents("php://input"));
	$busName = $business->name;
	$busLat = $business->latitude;
	$busLng = $business->longtude;
	$busCity = $business->city;
	$busDescription = $business->description;
	$busCategory = $business->category;
	$busNationality = $business->nationality;

	$conn = mysqli_connect($servername, $username, $password, $db);


	$businessData = insertBusiness($busName, $busLat, $busLng, $busCity, $busDescription, $busCategory, $busNationality);

	function insertBusiness($busName, $busLat, $busLng, $busCity, $busDescription, $busCategory, $busNationality) {
		global $conn;

		$insert = mysqli_query($conn,
			"CALL RegisterLocation('$busName', '$busLat', '$busLng', '$busCity', '$busDescription', '$busCategory', '$busNationality')") 
			or die("Query fail: " . mysqli_error($conn));
	}

	mysqli_close();		
?>