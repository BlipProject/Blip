<?php

	//error_reporting(0);
	//Configure DATABASE

	require_once 'blip_4815162342_108.php';
	$conn = db_connect();
	//Start Script

	//Input variables from Angular
	$review = json_decode(file_get_contents("php://input"));
	$locationID = (int)$review->locID;
	$userID = (int)$review->userID;
	$title = $review->title;
	$text = $review->text;
	$rating = $review->rating;
	var_dump($title);

	$update = updateReview($locationID, $userID, $title, $text, $rating);

	function updateReview($locationID, $userID, $title, $text, $rating) {
		global $conn;

		$updateQuery = mysqli_query($conn,
	    	"CALL UpdateReview('$locationID', '$userID', '$title', '$text', '$rating')") or die("Query fail: " . mysqli_error($conn));
	}

	mysqli_close($conn);
?>