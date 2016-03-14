<?php
	require_once 'blip_4815162342_108.php';
	$conn = db_connect();

	$userEmail = $_POST["email"];
	$userPassword = $_POST["password"];

	//variables from db
	$db_pass="";
	$db_salt="";

	//creating sprock and executing
	$get = mysqli_query($conn,
		     "Call CheckPassArtur('$userEmail')") or die("Query fail: " . mysqli_error($conn));

	while ($row = mysqli_fetch_row($get))
	{
		$db_pass = $row[0];
		$db_salt = $row[1];
	}

	$hash = crypt($userPassword, $db_salt);

	if ($hash == $db_pass)
	{
		$conn = db_connect();
		$user = mysqli_query($conn,
		     "Call UserDetails('$userEmail')") or die("Query fail: " . mysqli_error($conn));

		$userLogged;

		while ($row = mysqli_fetch_row($user))
		{
			$userId = $row[0];
			$userNat = $row[1];
			$userName = $row[2];
			$userVisited = $row[9];
			$userCountry = $row[11];
			$userCountryCode = $row[12];
		}

		session_start();

	    //setcookie("sessionId", session_id(), time() + (86400 * 30), "/");

	    setcookie("userId", $userId, time() + (86400 * 30), "/");
	    setcookie("userName", $userName, time() + (86400 * 30), "/");
	    setcookie("userNat", $userNat, time() + (86400 * 30), "/");
	    setcookie("userCountry", $userCountry, time() + (86400 * 30), "/");
	    setcookie("userCountryCode", $userCountryCode, time() + (86400 * 30), "/");
	    setcookie("userVisited", $userVisited, time() + (86400 * 30), "/");

		header('Location: http://localhost:9000/home.html#/');
		exit();
	}
	else
	{
		 header('Location: http://localhost:9000?reject=1');
	}
	//Return to Frontend

	//closing connection
	$conn->close();

?>