<?php

	///Configure DATABASE

	require_once 'blip_4815162342_108.php';
	$conn = db_connect();
	//Start Script

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


	$businessData = insertBusiness($locationName, $locationLat, $locationLng, $locationCity, $locationDescription, $locationCategory, $locationNationality, $locationUserId);

	function insertBusiness($locationName, $locationLat, $locationLng, $locationCity, $locationDescription, $locationCategory, $locationNationality, $locationUserId) {
		global $conn;

		$insert = mysqli_query($conn,
			"CALL RegisterLocation('$locationName', '$locationLat', '$locationLng', '$locationCity', '$locationDescription', '$locationCategory', '$locationNationality', '$locationUserId')")
			or die("Query fail: " . mysqli_error($conn));

	    return json_encode($insert->fetch_array(MYSQL_ASSOC),true);
	}

	echo ($businessData);
	mysqli_close($conn);
?>