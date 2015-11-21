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

	$conn = mysqli_connect($servername, $username, $password, $db);


	$businessData = insertBusiness($busName, $busLat, $busLng, $busCity, $busDescription, $busCategory);

	function insertBusiness($busName, $busLat, $busLng, $busCity, $busDescription, $busCategory) {
		global $conn;

		$insert = mysqli_query($conn,
			"CALL RegisterLocation('$busName', '$busLat', '$busLng', '$busCity', '$busDescription', '$busCategory')") 
			or die("Query fail: " . mysqli_error($conn));
	}