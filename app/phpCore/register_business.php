<?php

	///Configure DATABASE

	include 'blip_4815162342_108.php';
	
	//Start Script


	echo("Script Called ( . )( . )");
	//Input variables from Angular
	$location = json_decode(file_get_contents("php://input"));
	$busName = $location->name;
	$busLat = $location->latitude;
	$busLng = $location->longitude;
	$busCity = $location->city;
	$busDescription = $location->description;
	$busCategory = $location->category;
	$busNationality = $location->nationality;
	$locationUserId = $location->userid;

	$conn = mysqli_connect($servername, $username, $password, $db);


	$businessData = insertBusiness($busName, $busLat, $busLng, $busCity, $busDescription, $busCategory, $busNationality, $locationUserId);

	function insertBusiness($busName, $busLat, $busLng, $busCity, $busDescription, $busCategory, $busNationality, $locationUserId) {
		global $conn;

		$insert = mysqli_query($conn,
			"CALL RegisterLocation('$busName', '$busLat', '$busLng', '$busCity', '$busDescription', '$busCategory', '$busNationality', '$locationUserId')") 
			or die("Query fail: " . mysqli_error($conn));
	}

	mysqli_close($conn);		
?>