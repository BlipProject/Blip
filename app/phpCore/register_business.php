<?php

	///Configure DATABASE

	include 'blip_4815162342_108.php';
	
	//Start Script


	echo("Script Called ( . )( . )");
	//Input variables from Angular
	$location = json_decode(file_get_contents("php://input"));
	$locationName = $location->LocationName;
	$locationLat = $location->MapLat;
	$locationLng = $location->MapLng;
	$locationCity = $location->City;
	$locationDescription = $location->LocationDescription;
	$locationCategory = $location->CategoryID;
	$locationNationality = $location->Nationality;
	$locationUserId = $location->UserID;

	$conn = mysqli_connect($servername, $username, $password, $db);


	$businessData = insertBusiness($locationName, $locationLat, $locationLng, $locationCity, $blocationDescription, $locationCategory, $locationNationality, $locationUserId);

	function insertBusiness($locationName, $locationLat, $locationLng, $locationCity, $blocationDescription, $locationCategory, $locationNationality, $locationUserId) {
		global $conn;

		$insert = mysqli_query($conn,
			"CALL RegisterLocation('$locationName', '$locationLat', '$locationLng', '$locationCity', '$locationDescription', '$locationCategory', '$locationNationality', '$locationUserId')") 
			or die("Query fail: " . mysqli_error($conn));
	}

	mysqli_close($conn);		
?>