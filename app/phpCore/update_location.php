<?php

	//error_reporting(0);
	//Configure DATABASE

	require_once 'blip_4815162342_108.php';
	$conn = db_connect();
	//Start Script

	//Input variables from Angular
	$location = json_decode(file_get_contents("php://input"));
	$locID = (int)$location->id;
	$locName = $location->name;
	$locLat = (float)$location->lat;
	$locLng = (float)$location->lng;
	$locCity = $location->city;
	$locDes = $location->des;
	$locCat = (int)$location->cat;
	$locPic = $location->pic;
	$locPhone = $location->phone;
	$locWeb = $location->web;
	$locHour = $location->hours;
	$locNat = (int)$location->nat;

	$update = updateLocation($locID, $locName, $locLat, $locLng, $locCity, $locDes, $locCat, $locPic, $locPhone, $locWeb, $locHour, $locNat);

	function updateLocation($locID, $locName, $locLat, $locLng, $locCity, $locDes, $locCat, $locPic, $locPhone, $locWeb, $locHour, $locNat) {
		global $conn;

		$updateQuery = mysqli_query($conn,
	    	"CALL UpdateLocation($locID, '$locName', $locLat, $locLng, '$locCity', '$locDes', $locCat, '$locPic', '$locPhone', '$locWeb', '$locHour', $locNat)") or die("Query fail: " . mysqli_error($conn));
	}

	mysqli_close($conn);
?>